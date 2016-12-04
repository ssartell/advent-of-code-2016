var R = require('ramda');

var direction = 0;
var rotate = {
    R: -1,
    L: 1
};
var moves = [
    (p, m) => { p.y += m.distance; }, // north
    (p, m) => { p.x -= m.distance; }, // west
    (p, m) => { p.y -= m.distance; }, // south
    (p, m) => { p.x += m.distance; }, // eash
];
var mod = (n, m) => ((n % m) + m) % m;
var toMove = x => ({ direction: x[0], distance: parseInt(x.substring(1)) });
var parseInput = R.compose(R.map(toMove), R.map(R.trim), R.split(','), R.trim);

var evalMove = (position, move) => {
    var newDirection = mod(position.d + rotate[move.direction], 4);
    var newPosition = { x: position.x, y: position.y, d: newDirection };
    moves[newDirection](newPosition, move);
    return newPosition;
};

var gridDistance = (position) => Math.abs(position.x) + Math.abs(position.y);

var solution = R.compose(gridDistance, R.reduce(evalMove, { x: 0, y: 0, d: 0 }), parseInput);

module.exports = solution;