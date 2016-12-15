var R = require('ramda');

var props = ['i', 'positions', 'start'];
var lineRegex = /Disc #(\d*) has (\d*) positions; at time=0, it is at position (\d*)./;
var readLine = R.pipe(R.trim, R.match(lineRegex), R.tail, R.map(parseInt), R.zipObj(props));
var parseInput = R.pipe(R.trim, R.split('\n'), R.map(readLine));

var mod = (x, y) => ((x % y) + y) % y;
var isAligned = R.curry((i, disc) => {
    return mod(disc.pos + i, disc.positions) === 0;
});

var exec = discs => {
    discs.push({
        i: 7,
        positions: 11,
        start: 0
    });
    
    for(var disc of discs) {
        disc.pos = mod(disc.start + disc.i, disc.positions);
    }

    var i = 0;
    while(!R.all(isAligned(i), discs)) {
        i++;
    }

    return i;
};

var solution = R.pipe(parseInput, exec);

module.exports = solution;