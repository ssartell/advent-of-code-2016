var R = require('ramda');
var C = require('js-combinatorics');
var PriorityQueue = require('priorityqueuejs');
var output = require('./output');

var trace = x => {
    return x;
};

var readLine = R.pipe(R.trim, R.split(''));
var parseInput = R.pipe(R.trim, R.split('\n'), R.map(readLine), R.transpose);

var findNumbers = maze => {
    var result = [];
    for(var x = 0; x < maze.length; x++) {
        for(var y = 0; y < maze[0].length; y++) {
            var value = maze[x][y];
            if (value !== '#' && value !== '.') {
                var int = parseInt(value);
                result[int] = {x: x, y: y};
            }
        }
    }
    return result;
}

var cityBlockDist = (a, b) => Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
var distanceToWall = (maze, a) => Math.min(Math.min(maze.length - a.x, a.x), Math.min(maze[0].length - a.y, a.y));
var asComparator = R.curry((f, a, b) => f(b) - f(a));

var shortestPath = maze => {
    var numbers = R.range(0, 8);
    var numberLocs = findNumbers(maze);
    var pairs = C.combination(numbers, 2).toArray();
    var steps = [];
    var minPaths = [];

    for(var pair of pairs) {
        output.printMaze(maze);

        var startNumber = pair[0];
        var start = numberLocs[startNumber];
        var endNumber = pair[1];
        var end = numberLocs[endNumber];

        var aStar = a => a.steps + cityBlockDist(a, end);
        var bfs = a => a.steps;
        var fastAndStraight = a => a.steps + Math.pow(cityBlockDist(a, end), 3);
        var edge = a => distanceToWall(maze, a);

        var visited = {};
        var queue = new PriorityQueue(asComparator(aStar));
        queue.enq({x: start.x, y: start.y, steps: 0});

        while(queue.size() > 0) {
            var pos = queue.deq();
            var loc = maze[pos.x][pos.y];
            if (loc === '#') continue;
            if (visited[pos.x + ',' + pos.y]) continue;

            output.printPos(pos);

            visited[pos.x + ',' + pos.y] = true;
            if (loc !== '.') {
                if (parseInt(loc) === endNumber) {
                    steps[startNumber] = steps[startNumber] || [];
                    steps[endNumber] = steps[endNumber] || [];
                    steps[startNumber][endNumber] = pos.steps;
                    steps[endNumber][startNumber] = pos.steps;

                    minPaths[startNumber] = minPaths[startNumber] || [];
                    minPaths[endNumber] = minPaths[endNumber] || [];
                    minPaths[startNumber][endNumber] = pos.history;
                    minPaths[endNumber][startNumber] = R.reverse(pos.history);

                    break;
                }                
            }

            var history = pos.history || [];
            history = history.slice();
            history.push(pos);

            queue.enq({x: pos.x - 1, y: pos.y, steps: pos.steps + 1, history: history});
            queue.enq({x: pos.x + 1, y: pos.y, steps: pos.steps + 1, history: history});
            queue.enq({x: pos.x, y: pos.y - 1, steps: pos.steps + 1, history: history});
            queue.enq({x: pos.x, y: pos.y + 1, steps: pos.steps + 1, history: history});
        }


        output.printHistory(pos.history);
        output.sleep(1000);
    }

    var perms = R.filter(R.pipe(R.head, R.equals(0)), C.permutation(numbers).toArray());

    var lowest = Infinity;
    var lowestPerm;
    for(var perm of perms) {
        var s = 0;
        for(var i = 0; i < 7; i++) {
            s += steps[perm[i]][perm[i + 1]];
        }

        if (s < lowest) {
            lowest = s;
            lowestPerm = perm;
        }
    }

    output.printMaze(maze);
    for(var i = 0; i < perm.length - 1; i++) {
        output.printHistory(minPaths[lowestPerm[i]][lowestPerm[i + 1]], 25);
    }
    output.sleep(5000);
    output.gotoEnd(maze);
    
    return lowest;
}

var solution = R.pipe(parseInput, shortestPath);

module.exports = solution;