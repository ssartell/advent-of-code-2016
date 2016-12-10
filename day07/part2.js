var R = require('ramda');

var trace = x => {
    return x;
}

var parseInput = R.pipe(R.trim, R.split('\n'), R.map(R.trim));
var hasABA = R.pipe(R.match(/\S*(\w)((?!\1)\w)\1\w*(?:\[\w*\]\w*)*\[\w*\2\1\2\w*\]\S*/g), R.isEmpty, R.not);
var hasBAB = R.pipe(R.match(/\S*\[\w*(\w)((?!\1)\w)\1\w*\]\w*(?:\[\w*\]\w*)*\2\1\2\S*/g), R.isEmpty, R.not);
var isSSL = R.converge(R.or, [hasABA, hasBAB]);

var solution = R.pipe(parseInput, R.filter(isSSL), R.length);

module.exports = solution;