var R = require('ramda');

var parseInput = R.pipe(R.trim);

var not = x => x === '0' ? '1' : '0';
var mirror = R.pipe(R.split(''), R.reverse, R.map(not), R.join(''));
var dragonStep = x => x + '0' + mirror(x);
var isEven = x => x.length % 2 === 0;
var fixPair = x => x[0] === x[1] ? '1' : '0';
var checkSum = R.pipe(R.splitEvery(2), R.map(fixPair), R.join(''));

var checksumForDiskSize = R.curry((diskSize, input) => {
    while(input.length < diskSize) {
        input = dragonStep(input);
    }

    input = input.substr(0, diskSize);

    while(isEven(input)) {
        input = checkSum(input);
    }

    return input;
});

var solution = R.pipe(parseInput, checksumForDiskSize(35651584));

module.exports = solution;