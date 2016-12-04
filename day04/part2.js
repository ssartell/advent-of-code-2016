var R = require('ramda');

var trace = x => {
    console.log(x);
    return x;
};

var getCharCode = x => x.charCodeAt(0);
var toChar = String.fromCharCode;

var getCheckSum = R.compose(R.join(''), R.take(5), R.map(R.head), R.unnest, R.reverse, R.values, R.groupBy(R.prop('length')), R.sortBy(R.head), R.values, R.groupBy(R.identity));

var rotate = R.curry((sectorId, x) => {
    if (x === '-') {
        return ' ';
    } else {
        return toChar(((getCharCode(x) - 97 + sectorId) % 26) + 97);
    }
});

var cipher = (code, sectorId) => {
    return R.join('', R.map(rotate(sectorId), code));
};

var toRoomCode = (values) => {
    var sectorId = parseInt(values[1]);
    return {
        code: values[0],
        roomName: cipher(values[0], sectorId),
        realChecksum: getCheckSum(withoutDashes(values[0])),
        sectorId: sectorId,
        checksum: values[2]
    };
};

var checksumMatches = (roomCode) => {
    return roomCode.realChecksum == roomCode.checksum;
};

var withoutDashes = R.replace(/-/g, '');
var readLine = R.compose(R.tail, R.match(/((?:[a-z]*-)*)(\d*)\[([a-z]*)\]/), R.trim)
var parseInput = R.compose(trace, R.filter(checksumMatches), R.map(toRoomCode), R.map(readLine), R.split('\n'), R.trim);

var solution = parseInput;

module.exports = solution;