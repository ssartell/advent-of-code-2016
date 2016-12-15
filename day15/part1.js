var R = require('ramda');

var props = ['i', 'positions', 'start'];
var lineRegex = /Disc #(\d*) has (\d*) positions; at time=0, it is at position (\d*)./;
var readLine = R.pipe(R.trim, R.match(lineRegex), R.tail, R.map(parseInt), R.zipObj(props));
var parseInput = R.pipe(R.trim, R.split('\n'), R.map(readLine));

var isAligned = R.curry((i, disc) => (disc.start + disc.i + i) % disc.positions === 0);

var getTime = discs => {
    var i = 0;
    while(!R.all(isAligned(i), discs)) {
        i++
    }

    return i;
};

var solution = R.pipe(parseInput, getTime);

module.exports = solution;