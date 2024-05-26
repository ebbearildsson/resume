
const SCALE = 8;
const noiseScale = 100;
const waterDeepHeight = 0.35;
const waterHeight = 0.4;
const sandHeight = 0.45;
const grassHeight = 0.57;
const mountainHeight1 = 0.6;
const mountainHeight2 = 0.65;
const mountainHeight3 = 0.72;
const xSquish = 1;
const ySquish = 1;

function setup() {
    createCanvas(windowWidth, windowHeight);
    let island = generateIsland();
    background(0);
    //noStroke();
    waterMesh = generateMesh([
        [0, 0, 0, 0],
        [0, 1, 1, 0],
        [0, 1, 1, 0],
        [0, 0, 0, 0]
    ], 0);
    drawIsland(island);
    console.log(waterMesh);
    drawMesh([
        [0, 0, 0, 0],
        [0, 1, 1, 0],
        [0, 1, 1, 0],
        [0, 0, 0, 0]
    ], waterMesh);
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    let island = generateIsland();
    drawIsland(island);
}

function generateIsland() {
    let island = Array(windowHeight).fill(0).map(_ => Array(windowWidth).fill(0));
    for (y = 0; y < windowHeight; y += SCALE) {
        s = Math.sin((y / windowHeight) * Math.PI);
        for (x = 0; x < windowWidth; x += SCALE) {
            n = noise(x / noiseScale, y / noiseScale)
            c = Math.sin((x / windowWidth) * Math.PI);
            h = n * s * c;
            if (h < waterHeight) {
                h = 0;
            }
            island[y][x] = h;
        }
    }
    return island;
}

function generateMesh(grid, type) {
    rectangles = [];
    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[0].length; x++) {
            if (grid[y][x] == type) {
                console.log(grid);
                rectangle = getLargestRectangle(grid, x, y, type);
                console.log(rectangle);
                rectangles.push(rectangle);
                x += rectangle[2];
                y += rectangle[3]; 
            }
        }
    }
    return rectangles;
}

function getLargestRectangle(grid, sx, sy, value) {
    cx = sx;
    cy = sy;
    while(cx < grid.length - 1 && grid[cx + 1][cy] === value) {
        console.log(grid[cx + 1][cy], value)
        cx++;
        while(cy < grid[0].length - 1 && grid[cx][cy + 1] === value) {
            console.log(grid[cx][cy + 1], value)
            cy++;
        }
    }
    return [sx, sy, cx - sx, cy - sy];
}

function drawMesh(grid, mesh) {
    s = 100;
    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[0].length; x++) {
            fill(0, 255, 255);
            rect(x * s, y * s, s, s);
        }
    }
    for (let i = 0; i < mesh.length; i++) {
        fill('rgba(255, 0, 255, 0.5)');
        rect(mesh[i][0] * s, mesh[i][1] * s, mesh[i][2] * s, mesh[i][3] * s);
    }
}

function drawIsland(island) {
    for (y = 0; y < windowHeight; y += SCALE) {
        for (x = 0; x < windowWidth; x += SCALE) {
            fill(getColorFromHeight(island[y][x]));
            rect(x, y, SCALE, SCALE);
        }
    }
}

function getColorFromHeight(height) {
    if (height < waterHeight) {
        return color('#48cae4');
    } else if (height < sandHeight) {
        return color('#f0f3bd');
    } else if (height < grassHeight) {
        return color('#a7c957');
    } else if (height < mountainHeight1){
        return color('#dad7cd');
    } else if (height < mountainHeight2){
        return color('#a5a58d');
    } else if (height < mountainHeight3){
        return color('#7d7c6d');
    } else {
        return color('#ffffff');
    }
}