var R = require('ramda');

var rotate = {
    R: -1,
    L: 1
};
var moves = [
    (p, m) => { p.y += m.dist; }, // north
    (p, m) => { p.x -= m.dist; }, // west
    (p, m) => { p.y -= m.dist; }, // south
    (p, m) => { p.x += m.dist; }, // eash
];

var readLine = R.pipe(R.trim, R.splitAt(1), R.adjust(parseInt, 1), R.zipObj(['dir', 'dist']));
var parseInput = R.pipe(R.trim, R.split(','), R.map(readLine));

var mod = (n, m) => ((n % m) + m) % m;
var evalMove = (p, m) => {
    var newdir = mod(p.dir + rotate[m.dir], 4);
    var newPosition = { x: p.x, y: p.y, dir: newdir };
    moves[newdir](newPosition, m);
    return newPosition;
};
var gridDist = p => Math.abs(p.x) + Math.abs(p.y);

var solution = R.pipe(parseInput, R.reduce(evalMove, { x:0, y:0, dir:0 }), gridDist);

module.exports = solution;