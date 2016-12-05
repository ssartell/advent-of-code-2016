var R = require('ramda');

var und = undefined;
var keypad = [
    [und,und,'1',und,und],
    [und,'2','3','4',und],
    ['5','6','7','8','9'],
    [und,'A','B','C',und],
    [und,und,'D',und,und]];

var steps = {
    U: (p) => ({x: p.x, y: p.y - 1}),
    D: (p) => ({x: p.x, y: p.y + 1}),
    L: (p) => ({x: p.x - 1, y: p.y}),
    R: (p) => ({x: p.x + 1, y: p.y}),
};

var parseInput = R.pipe(R.split('\n'), R.map(R.pipe(R.trim, R.split(''))));
var getNumber = p => (keypad[p.y] || [])[p.x];
var applyStep = (p, s) => {
    var newPosition = steps[s](p);
    var number = getNumber(newPosition);
    return number ? newPosition : p;
};
var applySequence = R.pipe(R.reduce(applyStep, { x:0, y:2 }), getNumber);

var solution = R.pipe(parseInput, R.map(applySequence), R.join(''));

module.exports = solution;