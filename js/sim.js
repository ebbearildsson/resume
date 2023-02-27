var particles
const G = 0.2
const size = 30
const dmp = 0.005

function setup() {
    var canvas = createCanvas(windowWidth, windowHeight)
    canvas.parent('sketch')
    particles = []
    frameRate(60)
    background(0)
    noStroke()
}

function mouseReleased() {
    particles.push(new Particle(mouseX, mouseY, 30, color(random(100, 255), random(100, 255), random(100, 255))))
}

function draw() {
    background(0)
    particles.forEach(p => {
        p.update()
        p.checkBoundryCollision()
        p.checkParticleCollision()
        p.show()
    })
}


class Particle {
    constructor(x, y, r, c) {
        this.x = x
        this.y = y
        this.vx = 0
        this.vy = 0
        this.r = r
        this.c = c
    }
    
    update() {
        this.addGrav()
        this.addDamp()
        this.addVel()
    }

    checkParticleCollision() {
        particles.forEach(p => {
            if (p != this) {
                let d = dist(this.x, this.y, p.x, p.y)

                if (d <= this.r + p.r) {
                    let angle = atan2(p.y - this.y, p.x - this.x)
                    let nx = cos(angle)
                    let ny = sin(angle)
                    let tx = -ny
                    let ty = nx
                    let dpTan1 = this.vx * tx + this.vy * ty
                    let dpTan2 = p.vx * tx + p.vy * ty
                    let dpNorm1 = this.vx * nx + this.vy * ny
                    let dpNorm2 = p.vx * nx + p.vy * ny
                    let m1 = (dpNorm1 * (this.r - p.r) + 2 * p.r * dpNorm2) / (this.r + p.r)
                    let m2 = (dpNorm2 * (p.r - this.r) + 2 * this.r * dpNorm1) / (this.r + p.r)
                    this.vx = tx * dpTan1 + nx * m1
                    this.vy = ty * dpTan1 + ny * m1
                    p.vx = tx * dpTan2 + nx * m2
                    p.vy = ty * dpTan2 + ny * m2
                }
            }
        })
    }

    checkBoundryCollision() {
        if (this.x + this.r > width) {
            this.vx *= -1
            this.x = width - this.r
        }
        if (this.x - this.r < 0) {
            this.vx *= -1
            this.x = this.r
        }
        if (this.y + this.r > height) {
            this.vy *= -1
            this.y = height - this.r
        }
        if (this.y - this.r < 0) {
            this.vy *= -1
            this.y = this.r
        }
    }

    addGrav() {
        this.addAcc(0, 0.2)
    }

    addDamp() {
        this.addAcc(-this.vx * dmp, -this.vy * dmp)
    }

    addAcc(x, y) {
        this.vx += x
        this.vy += y
    }

    addVel() {
        this.x += this.vx
        this.y += this.vy
    }

    move(x, y) {
        this.x = x
        this.y = y
    }

    show() {
        fill(this.c)
        ellipse(this.x, this.y, this.r * 2)
    }
}