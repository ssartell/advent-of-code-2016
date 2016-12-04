var R = require('ramda');

var keypad = [
    ['0','0','1','0','0'],
    ['0','2','3','4','0'],
    ['5','6','7','8','9'],
    ['0','A','B','C','0'],
    ['0','0','D','0','0']];

var constrain = R.compose(R.max(0), R.min(2));
var steps = {
    U: (p) => ({x: p.x, y: p.y - 1}),
    D: (p) => ({x: p.x, y: p.y + 1}),
    L: (p) => ({x: p.x - 1, y: p.y}),
    R: (p) => ({x: p.x + 1, y: p.y}),
};

var parseInput = R.compose(R.map(R.compose(R.split(''), R.trim)), R.split('\n'), R.trim);
var applyStep = (p, s) => {
    var newPosition = steps[s](p);
    try {
        var number = getNumber(newPosition);
        if (number && number != '0') return newPosition;
    } catch (e) {}

    return p;
};
var getNumber = (p) => keypad[p.y][p.x];
var applySequence = R.compose(getNumber, R.reduce(applyStep, { x:0, y:2 }));

var solution = R.compose(R.join(''), R.map(applySequence), parseInput);

module.exports = solution;