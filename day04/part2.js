var R = require('ramda');

var getCharCode = x => x.charCodeAt(0);
var toChar = String.fromCharCode;
var rotate = R.curry((sectorId, x) => {
    return x === '-' ? ' ' : toChar(((getCharCode(x) - 97 + sectorId) % 26) + 97);
});

var cipher = (code, sectorId) => {
    return R.join('', R.map(rotate(sectorId), code));
};

var toRoomCode = (values) => ({
        roomName: cipher(values[0], parseInt(values[1])),
        sectorId: parseInt(values[1]),
    });

var checksumsMatch = R.converge(R.equals, [R.prop('realChecksum'), R.prop('checksum')]);
var readLine = R.pipe(R.trim, R.match(/((?:[a-z]*-?)*)-(\d*)\[([a-z]*)\]/), R.tail, toRoomCode);
var parseInput = R.pipe(R.trim, R.split('\n'), R.map(readLine));
var matchesName = R.pipe(R.prop('roomName'), R.equals('northpole object storage'));
var solution = R.pipe(parseInput, R.filter(checksumsMatch), R.find(matchesName), R.prop('sectorId'));

module.exports = solution;