var R = require('ramda');
var C = require('js-combinatorics');
var md5 = require('md5');

var debug = x => {
    debugger;
    return x;
}

var parseInput = R.pipe(R.trim);

var dirs = {
    up: 0,
    down: 1,
    left: 2,
    right: 3
};

var isOpen = x => x === 'b' || x === 'c' || x === 'd' || x === 'e' || x === 'f';

var queue = [];
var exec = input => {
    var start = { x: 0, y: 0, steps: 0, seq: '' };
    queue.push(start);

    var pos
    while(pos = queue.shift()) {
        if (pos.x === 3 && pos.y === 3) return pos.seq;
        if (pos.x < 0 || pos.x > 3) continue;
        if (pos.y < 0 || pos.y > 3) continue;

        var hash = md5(input + pos.seq);
        
        if (isOpen(hash[dirs.up])) queue.push({ x: pos.x, y: pos.y - 1, steps: pos.steps + 1, seq: pos.seq + 'U' });
        if (isOpen(hash[dirs.down])) queue.push({ x: pos.x, y: pos.y + 1, steps: pos.steps + 1, seq: pos.seq + 'D' });
        if (isOpen(hash[dirs.left])) queue.push({ x: pos.x - 1, y: pos.y, steps: pos.steps + 1, seq: pos.seq + 'L' });
        if (isOpen(hash[dirs.right])) queue.push({ x: pos.x + 1, y: pos.y, steps: pos.steps + 1, seq: pos.seq + 'R' });
    }
};

var solution = R.pipe(parseInput, exec);

module.exports = solution;