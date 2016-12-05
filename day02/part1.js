var R = require('ramda');

var keypad = [[1,2,3],[4,5,6],[7,8,9]];

var constrain = R.pipe(R.max(0), R.min(2));
var steps = {
    U: (p) => ({x: p.x, y: constrain(p.y - 1)}),
    D: (p) => ({x: p.x, y: constrain(p.y + 1)}),
    L: (p) => ({x: constrain(p.x - 1), y: p.y}),
    R: (p) => ({x: constrain(p.x + 1), y: p.y}),
};

var parseInput = R.pipe(R.split('\n'), R.map(R.pipe(R.trim, R.split(''))));
var applyStep = (p, s) => steps[s](p);
var getNumber = (p) => keypad[p.y][p.x];
var applySequence = R.pipe(R.reduce(applyStep, { x:1, y:1 }), getNumber);

var solution = R.pipe(parseInput, R.map(applySequence), R.join(''));

module.exports = solution;