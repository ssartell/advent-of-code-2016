var R = require('ramda');

var parseInput = parseInt;

var countBits = R.memoize(n => {
    if (n === 0) return 0;
    return (n & 1) + countBits(n >>> 1)
});

var isWall = (x, y, favNum) => {
    var step1 = x*x + 3*x + 2*x*y + y + y*y;
    var step2 = step1 + favNum;
    var step3 = countBits(step2);
    return step3 % 2 !== 0;
};

var createPos = (x, y, steps) => ({ x: x, y: y, steps: steps });

var queue = [];
var fewestSteps = R.curry((x, y, favNum) => {
    var maze = [];

    var initialPos = createPos(1, 1, 0);
    queue.push(initialPos);

    var pos
        locs = 0;
    while (pos = queue.shift()) {
        if (pos.steps > 50) continue; // final
        if (pos.x < 0 || pos.y < 0) continue; // out of bounds
        if (maze[pos.x] === undefined) maze[pos.x] = [];
        
        if (maze[pos.x][pos.y] === undefined) { // new position
            if (isWall(pos.x, pos.y, favNum)) {
                maze[pos.x][pos.y] = -1;
            } else {
                maze[pos.x][pos.y] = pos.steps; 
                locs++;

                queue.push(createPos(pos.x - 1, pos.y, pos.steps + 1));
                queue.push(createPos(pos.x + 1, pos.y, pos.steps + 1));
                queue.push(createPos(pos.x, pos.y - 1, pos.steps + 1));
                queue.push(createPos(pos.x, pos.y + 1, pos.steps + 1));
            }
        }
    }

    return locs;
});

var solution = R.pipe(parseInput, fewestSteps(31, 39));

module.exports = solution;