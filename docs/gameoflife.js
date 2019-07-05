var WORLD_SIZE = 100;
var world = [];
var adjacent = [];
var tableElement;
function setup() {
    for (var i = 0; i < WORLD_SIZE; i++) {
        world[i] = [];
        adjacent[i] = [];
        for (var j = 0; j < WORLD_SIZE; j++) {
            world[i][j] = 0;
            adjacent[i][j] = 0;
        }
    }
    tableElement = document.body.firstElementChild;
    // load the images?
    // Initialize the map
    // down right glider
    world[10][10] = 1;
    world[11][11] = 1;
    world[11][12] = 1;
    world[10][12] = 1;
    world[9][12] = 1;
    // right MWSS
    world[40][10] = 1;
    world[40][11] = 1;
    world[40][12] = 1;
    world[40][13] = 1;
    world[40][14] = 1;
    world[39][14] = 1;
    world[38][14] = 1;
    world[37][13] = 1;
    world[36][11] = 1;
    world[37][9] = 1;
    world[39][9] = 1;
    setInterval(function () { return update(); }, 200);
}
function update() {
    // 1 cell border to simplify calculation
    for (var i = 1; i < WORLD_SIZE - 1; i++) {
        for (var j = 1; j < WORLD_SIZE - 1; j++) {
            adjacent[i][j] =
                world[i - 1][j - 1] +
                    world[i - 1][j] +
                    world[i - 1][j + 1] +
                    world[i][j - 1] +
                    world[i][j + 1] +
                    world[i + 1][j - 1] +
                    world[i + 1][j] +
                    world[i + 1][j + 1];
        }
    }
    for (var i = 1; i < WORLD_SIZE - 1; i++) {
        for (var j = 1; j < WORLD_SIZE - 1; j++) {
            if (world[i][j]) {
                // active cell
                if (adjacent[i][j] === 2 || adjacent[i][j] === 3) {
                    world[i][j] = 1;
                }
                else {
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
    for (var i = 1; i < WORLD_SIZE - 1; i++) {
        for (var j = 1; j < WORLD_SIZE - 1; j++) {
            var cell = tableElement.firstElementChild.children[i].children[j];
            if (world[i][j]) {
                cell.classList.add('cell');
            }
            else {
                cell.classList.remove('cell');
            }
        }
    }
}
window.onload = function () { return setup(); };
