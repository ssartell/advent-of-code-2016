var R = require('ramda');

var trace = x => {
    console.log(x);
    return x;
};

var getCheckSum = R.compose(R.join(''), R.take(5), R.map(R.head), R.unnest, R.reverse, R.values, R.groupBy(R.prop('length')), R.sortBy(R.head), R.values, R.groupBy(R.identity));

var toRoomCode = (values) => ({
        realChecksum: getCheckSum(values[0]),
        sectorId: parseInt(values[1]),
        checksum: values[2]
    });

var checksumMatches = (roomCode) => {
    return roomCode.realChecksum == roomCode.checksum;
};

var readLine = R.compose(R.map(R.replace(/-/g, '')), R.tail, R.match(/((?:[a-z]*-)*)(\d*)\[([a-z]*)\]/), R.trim)
var parseInput = R.compose(R.sum, R.map(R.prop('sectorId')), R.filter(checksumMatches), R.map(toRoomCode), R.map(readLine), R.split('\n'), R.trim);

var solution = parseInput;

module.exports = solution;