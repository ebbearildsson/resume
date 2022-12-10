let points = []
let l = 300
let bg = 255
const s = 0.5
const N = 50

function setup() {
    var canvas = createCanvas(windowWidth, windowHeight * 0.5)
    canvas.parent('sketch')
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        bg = 0
        stroke(255)
    } 
    else {
        bg = 255
        stroke(0)
    }

    l = Math.floor(width / 6)

    for(let i = 0; i < N; i++) 
        points.push([createVector(random(width), random(height)), createVector(random(-s, s), random(-s, s))])
    points.push([createVector(-l/2, 0), createVector(0, 1)])
    points.push([createVector(-l/2, height), createVector(0, -1)])
    points.push([createVector(width + l/2, 0), createVector(0, 1)])
    points.push([createVector(width + l/2, height), createVector(0, -1)])
}

function draw() {
    background(bg)
    

    for(let i = 0; i < points.length; i++) {
        points[i][0].add(points[i][1])
        if(points[i][0].x > width || points[i][0].x < 0) points[i][1].x *= -1
        if(points[i][0].y > height || points[i][0].y < 0) points[i][1].y *= -1
        points.forEach(p => {
            if(p != points[i] && dist(p[0].x, p[0].y, points[i][0].x, points[i][0].y) < l) line(p[0].x, p[0].y, points[i][0].x, points[i][0].y)
        })
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}