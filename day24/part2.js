var R = require('ramda');
var C = require('js-combinatorics');

var trace = x => {
    return x;
}

var readLine = R.pipe(R.trim, R.split(''));
var parseInput = R.pipe(R.trim, R.split('\n'), R.map(readLine), R.transpose);

var findStart = (maze, number) => {
    for(var x = 0; x < maze.length; x++) {
        for(var y = 0; y < maze[0].length; y++) {
            if (maze[x][y] === number) return {x: x, y: y, s: 0};
        }
    }
}

var shortestPath = maze => {
    var steps = [];

    for(var i = 0; i <= 7; i++) {
        var queue = [];
        var visited = {};
        steps[i] = [];

        var start = findStart(maze, i + '');
        queue.push(start);

        var pos;
        while(pos = queue.shift()) {
            var loc = maze[pos.x][pos.y];
            if (loc === '#') continue;
            if (visited[pos.x + ',' + pos.y]) continue;
            visited[pos.x + ',' + pos.y] = true;
            if (loc !== '.') {
                var number = +loc;
                steps[i][number] = pos.s;
            }
            queue.push({x: pos.x - 1, y: pos.y, s: pos.s + 1});
            queue.push({x: pos.x + 1, y: pos.y, s: pos.s + 1});
            queue.push({x: pos.x, y: pos.y - 1, s: pos.s + 1});
            queue.push({x: pos.x, y: pos.y + 1, s: pos.s + 1});
        }
    }

    var numbers = R.range(0, 8);
    var perms = R.filter(R.pipe(R.head, R.equals(0)), C.permutation(numbers).toArray());

    var lowest = Infinity;

    for(var perm of perms) {
        perm.push(0);
        var s = 0;
        for(var i = 0; i < 8; i++) {
            s += steps[perm[i]][perm[i + 1]];
        }

        if (s < lowest) lowest = s;
    }
    
    return lowest;
}

var solution = R.pipe(parseInput, shortestPath);

module.exports = solution;