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

var fewestMoves = grid => {    
    for(var x = 0; x < grid.length; x++) {
        var row = x;
        for(var y = 0; y < grid[x].length; y++) {
            var node = grid[x][y];
            if (node.used === 0) {
                row += '_';
            } else if (node.size > 100) {
                row += '#';
            } else {
                row += '.';
            }
        }
        console.log(row);
    }
}

var solution = R.pipe(parseInput, toGrid, fewestMoves);

module.exports = solution;