var R = require('ramda');

var lineRegex = /\/dev\/grid\/node-x(\d*)-y(\d*)\s*(\d*)T\s*(\d*)T\s*(\d*)T\s*(\d*)%/;
var tryParseInt = x => isNaN(parseInt(x)) ? x : parseInt(x);
var readLine = R.pipe(R.match(lineRegex), R.tail, R.map(tryParseInt), R.zipObj(['x','y','size','used','avail','usePercent']));

var parseInput = R.pipe(R.trim, R.split('\n'), R.drop(2), R.map(readLine));

var toGrid = nodes => {
    var grid = [];
    for(var node of nodes) {
        if (!grid[node.x]) grid[node.x] = [];
        grid[node.x][node.y] = node;
    }

    return grid;
};

var isViable = (nodeA, nodeB) => {
    if (nodeA.used === 0) return false;
    if (nodeA.x === nodeB.x && nodeA.y === nodeB.y) return false;
    if (nodeA.used > nodeB.avail) return false;
    return true;
}

var viablePairs = grid => {
    var viablePairs = 0;
    for(var i = 0; i < grid.length; i++) {
        for(var j = 0; j < grid[i].length; j++) {
            for(var x = 0; x < grid.length; x++) {
                for(var y = 0; y < grid[x].length; y++) {
                    viablePairs += isViable(grid[i][j], grid[x][y]);
                }
            }
        }
    }

    return viablePairs;
}

var solution = R.pipe(parseInput, toGrid, viablePairs);

module.exports = solution;