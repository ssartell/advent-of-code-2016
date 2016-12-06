var R = require('ramda');

var parseInput = R.pipe(R.trim, R.split('\n'), R.map(R.pipe(R.trim, R.split(''))));
var getMessage = R.pipe(R.transpose, R.map(R.pipe(R.countBy(R.identity), R.toPairs, R.sortBy(R.last), R.head, R.head)), R.join(''));

var solution = R.pipe(parseInput, getMessage);

module.exports = solution;