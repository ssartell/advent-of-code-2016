var R = require('ramda');

var parseInput = R.pipe(R.trim, R.split('\n'), R.map(R.trim));
var hasPair = R.pipe(R.match(/(\w)((?!\1)\w)\2\1/g), R.isEmpty, R.not);
var hasNoPairsInBrakets = R.pipe(R.match(/\[\w*(\w)((?!\1)\w)\2\1\w*\]/g), R.isEmpty);

var solution = R.pipe(parseInput, R.filter(R.converge(R.and, [hasPair, hasNoPairsInBrakets])), R.length);

module.exports = solution;