var R = require('ramda');

var parseInput = R.pipe(R.trim, R.split('\n'), R.map(R.pipe(R.split('-'), R.map(parseInt))));

var rangeContains = R.curry((n, r) => r[0] <= n && n <= r[1]);

var lowestAddress = ranges => {
	ranges = R.sortBy(R.tail, ranges);
	var lowest = 0;
	var count = 0;
	var range;
	while(lowest <= 4294967295) {
	while(range = R.find(rangeContains(lowest), ranges)) {
		lowest = range[1] + 1;
	}
		count++;
		lowest++;
	}
	return count - 1;
};

var solution = R.pipe(parseInput, lowestAddress);

module.exports = solution;
