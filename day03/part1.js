var R = require('ramda');

var isTriangle = (sides) => {
    return (sides[0] + sides[1] > sides[2])
        && (sides[1] + sides[2] > sides[0])
        && (sides[2] + sides[0] > sides[1]);
};

var readTriangle = R.compose(R.map(parseInt), R.tail, RegExp.prototype.exec.bind(/\s*(\d*)\s*(\d*)\s*(\d*)/), R.trim);
var parseInput = R.compose(R.sum, R.map(R.compose(isTriangle, readTriangle)), R.split('\n'), R.trim)

var solution = R.compose(parseInput);

module.exports = solution;