var R = require('ramda');

var isTriangle = R.pipe(R.sortBy(R.identity), R.reverse, R.converge(R.lt, [R.head, R.pipe(R.tail, R.sum)]))
var readTriangle = R.pipe(R.trim, R.match(/\s*(\d*)\s*(\d*)\s*(\d*)/), R.tail, R.map(parseInt));
var parseInput = R.pipe(R.trim, R.split('\n'), R.map(readTriangle))
var solution = R.pipe(parseInput, R.map(isTriangle), R.sum);

module.exports = solution;