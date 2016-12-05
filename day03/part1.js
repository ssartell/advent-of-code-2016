var R = require('ramda');

var isTriangle = R.compose(R.converge(R.lt, [R.head, R.compose(R.sum, R.tail)]), R.reverse, R.sortBy(R.identity))
var readTriangle = R.compose(R.map(parseInt), R.tail, R.match(/\s*(\d*)\s*(\d*)\s*(\d*)/), R.trim);
var parseInput = R.compose(R.map(readTriangle), R.split('\n'), R.trim)
var solution = R.compose(R.sum, R.map(isTriangle), parseInput);

module.exports = solution;