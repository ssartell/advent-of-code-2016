var R = require('ramda');

var keypad = [[1,2,3],[4,5,6],[7,8,9]];

var constrain = R.compose(R.max(0), R.min(2));
var steps = {
    U: (p) => ({x: p.x, y: constrain(p.y - 1)}),
    D: (p) => ({x: p.x, y: constrain(p.y + 1)}),
    L: (p) => ({x: constrain(p.x - 1), y: p.y}),
    R: (p) => ({x: constrain(p.x + 1), y: p.y}),
};

var parseInput = R.compose(R.map(R.compose(R.split(''), R.trim)), R.split('\n'), R.trim);
var applyStep = (p, s) => steps[s](p);
var getNumber = (p) => keypad[p.y][p.x];
var applySequence = R.compose(getNumber, R.reduce(applyStep, { x:1, y:1 }));

var solution = R.compose(R.join(''), R.map(applySequence), parseInput);

module.exports = solution;