var R = require('ramda');

var parseInput = R.pipe(R.split('\n'), R.map(R.trim));
var getMessage = R.pipe(R.transpose, R.groupBy(R.identity), R.values, R.sortBy(R.prop('length')), R.map(R.tail), R.join(''));

var solution = R.pipe(parseInput, getMessage);

module.exports = solution;
