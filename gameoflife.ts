import {data} from './map-data';

let worldSize = 100;
const world: number[][] = [];
const adjacent: number[][] = [];
let tableElement: Element;

function setup() {
    for (let i = 0; i < worldSize; i++) {
        world[i] = [];
        adjacent[i] = [];
        for (let j = 0; j < worldSize; j++) {
            world[i][j] = 0;
            adjacent[i][j] = 0;
        }
    }

    tableElement = document.body.firstElementChild;

    // load the images?

    // Initialize the map
    if (data.size) {
        worldSize = data.size;
    }
    if (data.world) {
        for (let i = 0; i < worldSize; i++) {
            for (let j = 0; j < worldSize; j++) {
                world[i][j] = data.world[i][j];
            }
        }
    }


    setInterval(() => update(), 200)
}

function update() {
    // 1 cell border to simplify calculation
    for (let i = 1; i < worldSize-1; i++) {
        for (let j = 1; j < worldSize-1; j++) {
            adjacent[i][j] = 
                world[i-1][j-1] +
                world[i-1][j] +
                world[i-1][j+1] +
                world[i][j-1] +
                world[i][j+1] +
                world[i+1][j-1] +
                world[i+1][j] +
                world[i+1][j+1];
        }
    }

    for (let i = 1; i < worldSize-1; i++) {
        for (let j = 1; j < worldSize-1; j++) {
            if (world[i][j]) {
                // active cell
                if (adjacent[i][j] === 2 || adjacent[i][j] === 3) {
                    world[i][j] = 1;
                } else {
                    world[i][j] = 0;
                }
            }
            else {
                // inactive cell
                if (adjacent[i][j] === 3) {
                    world[i][j] = 1;
                }
            }
        }
    }
    render();
}

function render() {
    for (let i = 1; i < worldSize-1; i++) {
        for (let j = 1; j < worldSize-1; j++) {
            const cell = tableElement.firstElementChild.children[i].children[j];
            if (world[i][j]) {
                cell.classList.add('cell');
            } else {
                cell.classList.remove('cell');
            }
        }
    }
}

window.onload = () => setup();