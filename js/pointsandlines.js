let points = []
const l = 300
const s = 1
const N = 50

function setup() {
    var canvas = createCanvas(windowWidth, windowHeight * 0.5)
    canvas.parent('sketch')
    for(let i = 0; i < N; i++) points.push([createVector(random(width), random(height)), createVector(random(-s, s), random(-s, s))])
}

function draw() {
    background(255)
    stroke(0)
    for(let i = 0; i < points.length; i++) {
        points[i][0].add(points[i][1])
        if(points[i][0].x > width || points[i][0].x < 0) points[i][1].x *= -1
        if(points[i][0].y > height || points[i][0].y < 0) points[i][1].y *= -1
        points.forEach(p => {if(p != points[i] && dist(p[0].x, p[0].y, points[i][0].x, points[i][0].y) < l) line(p[0].x, p[0].y, points[i][0].x, points[i][0].y)})
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
  }