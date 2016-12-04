var R = require('ramda');

var startingPosition = { x: 0, y: 0, d: 0 };
var rotate = {
    R: -1, // right
    L: 1, // left
    S: 0 // straight
};
var moves = [
    (p, m) => { p.y += m.distance; }, // north
    (p, m) => { p.x -= m.distance; }, // west
    (p, m) => { p.y -= m.distance; }, // south
    (p, m) => { p.x += m.distance; }, // eash
];
var mod = (n, m) => ((n % m) + m) % m;
var toMove = x => ({ direction: x[0], distance: parseInt(x.substring(1)) });
var toManyMoves = x => {
    var moves = [];
    moves.push({ direction: x.direction, distance: 1});
    for(var i = 1; i < x.distance; i++) {
        moves.push({
            direction: 'S',
            distance: 1
        })
    }
    return moves;
};
var parseInput = R.compose(R.unnest, R.map(toManyMoves), R.map(toMove), R.map(R.trim), R.split(','), R.trim);

var evalMove = (position, move) => {
    var newDirection = mod(position.d + rotate[move.direction], 4);
    var newPosition = { x: position.x, y: position.y, d: newDirection };
    moves[newDirection](newPosition, move);
    return newPosition;
};

var oldPositions = {};
var isNotRepeat = (position, move) => {
    var key = position.x + '_' + position.y;
    if (oldPositions[key]) {
        return false;
    } else {
        oldPositions[key] = position;
        return true;
    }
}

var gridDistance = (position) => Math.abs(position.x) + Math.abs(position.y);

var solution = R.compose(gridDistance, R.reduceWhile(isNotRepeat, evalMove, startingPosition), parseInput);

module.exports = solution;