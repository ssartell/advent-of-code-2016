var R = require('ramda');

var isTriangle = (sides) => {
    return (sides[0] + sides[1] > sides[2])
        && (sides[1] + sides[2] > sides[0])
        && (sides[2] + sides[0] > sides[1]);
};

var readTriangle = R.compose(R.map(parseInt), R.tail, RegExp.prototype.exec.bind(/\s*(\d*)\s*(\d*)\s*(\d*)/), R.trim);
var toVerticalTriangles = R.compose(R.chain(R.transpose), R.splitEvery(3));
var parseInput = R.compose(R.sum, R.map(isTriangle), toVerticalTriangles, R.map(readTriangle), R.split('\n'), R.trim)

var solution = R.compose(parseInput);

module.exports = solution;