var R = require('ramda');

var rotate = {
    R: -1, // right
    L: 1, // left
    S: 0 // straight
};
var moves = [
    (p, m) => { p.y += m.dist; }, // north
    (p, m) => { p.x -= m.dist; }, // west
    (p, m) => { p.y -= m.dist; }, // south
    (p, m) => { p.x += m.dist; }, // eash
];
var mod = (n, m) => ((n % m) + m) % m;
var splitBlocks = x => R.concat([{ dir: x.dir, dist: 1}], R.repeat({ dir: 'S', dist: 1}, x.dist - 1));
var readLine = R.pipe(R.trim, R.splitAt(1), R.adjust(parseInt, 1), R.zipObj(['dir', 'dist']));
var parseInput = R.pipe(R.trim, R.split(','), R.map(readLine), R.map(splitBlocks), R.unnest);

var evalMove = (position, move) => {
    var newdir = mod(position.dir + rotate[move.dir], 4);
    var newPosition = { x: position.x, y: position.y, dir: newdir };
    moves[newdir](newPosition, move);
    return newPosition;
};

var old = {};
var isNotRepeat = (p, m) => {
    var key = p.x + '_' + p.y;
    return !old[key] && (old[key] = p);
}

var griddist = (p) => Math.abs(p.x) + Math.abs(p.y);

var solution = R.pipe(parseInput, R.reduceWhile(isNotRepeat, evalMove, { x:0, y:0, dir:0 }), griddist);

module.exports = solution;