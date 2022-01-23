let head, step_x, step_y, dir
const res = 20

function setup() {
    createCanvas(windowWidth, windowHeight)
    frameRate(5)
    background(20)
    step_x = windowWidth / res
    step_y = windowHeight / res
    dir = new Point(1, 0)
    head = new Part(new Point(step_x, step_y).mult(res / 2), null, dir)
}

function draw() {
    background(20)
    head.addPart()
    head.update(dir)
}

function keyPressed() {
    switch(keyCode) {
        case(LEFT_ARROW): dir = new Point(-1, 0)
            break;
        case(RIGHT_ARROW): dir = new Point(1, 0)
            break;
        case(UP_ARROW): dir = new Point(0, -1)
            break;
        case(DOWN_ARROW): dir = new Point(0, 1)
            break;
    }
    switch(key) {
        case('a'): dir = new Point(-1, 0)
            break;
        case('d'): dir = new Point(1, 0)
            break;
        case('w'): dir = new Point(0, -1)
            break;
        case('s'): dir = new Point(0, 1)
            break;
    }
}

class Part{
    constructor(pos = new Point(), tail, dir = new Point()) {
        this.pos = pos
        this.tail = tail
        this.dir = dir
    }

    addPart() {
        if(this.tail != null) {
            this.tail.addPart()
        } else {
            this.tail = new Part(this.pos,)
        }
    }

    update(dir) {
        if(this.tail != null) {
            this.tail.updateTail(this.pos)  
        }
        this.move(dir)
        this.draw()
    }

    move(dir) {
        this.pos.add(dir.mult(res))
    }

    moveTo(pos) {
        this.pos = pos
    }

    draw() {
        rect(this.pos.x, this.pos.y, res, res)
    }

    updateTail(pos) {
        this.moveTo(pos)
        this.draw()
        if(this.tail != null) {
            this.tail.updateTail(this.dir)  
        }
    }
}

class Point {
    constructor(x = 0, y = 0) {
        this.x = x
        this.y = y
    }

    mult(val) {
        return new Point(this.x * val, this.y * val)
    }

    add(other) {
        this.x += other.x
        this.y += other.y
    }
}