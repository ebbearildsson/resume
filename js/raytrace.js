const MINDISTANCE = 1e-12;
const MAXDISTANCE = 1000;
const MAXSTEPS = 500;
const MAXBOUNCES = 1;
const SCALE = 4;
let camera;

const getObjects = () => [
    new Sphere(createVector(window.innerWidth / 2,         window.innerHeight / 2,         700), color(255, 0,   0),   100),
    new Sphere(createVector(window.innerWidth / 7,         window.innerHeight / 1.5,       410), color(255, 255, 0),   100),
    new Sphere(createVector(window.innerWidth / 1.1,       window.innerHeight / 1.3,       310), color(0,   255, 255), 150),
    new Sphere(createVector(window.innerWidth / 1.2,       window.innerHeight / 1.5,       610), color(255, 0,   255), 50),
    new Sphere(createVector(window.innerWidth / 2 + 102,   window.innerHeight / 2 + 350,   100), color(0,   255, 0),   100),
    new Sphere(createVector(window.innerWidth / 2 - 102,   window.innerHeight / 2 + 350,   100), color(0,   0,   255), 100),
    new Plane(createVector(0, window.innerHeight, 0), color(255, 255, 255), createVector(0, 1, 0)),
    new Plane(createVector(0, 0, 0),                  color(255, 255, 255), createVector(0, -1, 0)),
    new Plane(createVector(window.innerWidth, 0, 0),  color(0, 255, 0),     createVector(1, 0, 0)),
    new Plane(createVector(0, 0, 0),                  color(0, 255, 0),     createVector(-1, 0, 0)),
    new Plane(createVector(0, 0, MAXDISTANCE),        color(0, 0, 255),     createVector(0, 0, 1)),
];

const getLights = () => [createVector(0, 1000, 1000),];

function setup() {
    createCanvas(windowWidth, windowHeight);
    background(0);
    noStroke();

    camera = new Camera(
        createVector(window.innerWidth / 2, window.innerHeight / 2, -800), 
        getObjects(), 
        getLights(),
    );

    console.log('Starting raytrace...')
    t0 = performance.now();
    camera.render();
    console.log('Complete!\nTime:', (performance.now() - t0) / 1000, 's');
}

class Ray {
    constructor(origin, direction, last_hit = undefined, step = 0, bounce = 0) {
        this.direction = direction;
        this.last_hit = last_hit;
        this.origin = origin;
        this.bounce = bounce;
        this.step = step;
    }

    trace() {
        if (this.step > MAXSTEPS || this.origin.z > MAXDISTANCE) return undefined;

        const closest = camera.models.reduce((closest, current) => {
            if (current === this.last_hit) return closest;
            const d = current.sdf(this.origin);
            return d < closest.distance ? {distance: d, model: current} : closest;
        }, {distance: MAXDISTANCE, model: undefined});
        
        if (closest.distance < MINDISTANCE) {
            this.last_hit = closest.model;

            const distance_to_camera = 1 - (this.origin.z / MAXDISTANCE);
            const ambient_occlusion = Math.abs(1 - (this.step / 255));
            const normal_angle = Math.abs(closest.model.normal(this.origin).dot(this.direction));
            let hit_color = lerpColor(color(0), closest.model.color, 0.25 + (normal_angle * ambient_occlusion * distance_to_camera));

            if (this.bounce < MAXBOUNCES) {
                const normal = closest.model.normal(this.origin);
                const reflection = p5.Vector.sub(this.direction, p5.Vector.mult(normal, 2 * this.direction.dot(normal)));
                const reflected_color = new Ray(p5.Vector.add(this.origin, p5.Vector.mult(reflection, closest.distance)), reflection, this.last_hit, 0, this.bounce + 1).trace();
                if (reflected_color) hit_color = lerpColor(hit_color, reflected_color, 0.5 * (this.bounce + 1));
            } 
            return hit_color;
        }
        return new Ray(p5.Vector.add(this.origin, p5.Vector.mult(this.direction, closest.distance)), this.direction, this.last_hit, this.step + 1, this.bounce).trace();
    }
}

class Camera {
    constructor(origin, models, lights) {
        this.origin = origin;
        this.models = models;
        this.lights = lights;
    }
    
    frustum() {
        let list = [];
        for (let y = 0; y < window.innerHeight / SCALE; y++) {
            for (let x = 0; x < window.innerWidth / SCALE; x++) {
                const position = createVector(x * SCALE, y * SCALE, 0);
                list.push(new Ray(position, p5.Vector.sub(position, this.origin).normalize()));
            }
        }
        return list;
    }
    
    render() {
        const rays = this.frustum();
        rays.forEach(ray => {
            const c = ray.trace();
            fill(c || color(50));
            square(ray.origin.x, ray.origin.y, SCALE);
        });
    }
}

class Model {
    constructor(origin, color) {
        this.color = color;
        this.origin = origin;
    }

    sdf = () => new TypeError('Method "sdf" must be implemented.');

    normal = () => new TypeError('Method "normal" must be implemented.');
}

class Sphere extends Model {
    constructor(origin, color, radius) {
        super(origin, color);
        this.radius = radius;
    }

    sdf = (p) => p.dist(this.origin) - this.radius;

    normal = (p) => p5.Vector.sub(p, this.origin).normalize();
}

class Plane extends Model {
    constructor(origin, color, n) {
        super(origin, color);
        this.n = n;
    }

    sdf = (p) => this.n.dot(p5.Vector.sub(this.origin, p));

    normal = () => this.n;
}