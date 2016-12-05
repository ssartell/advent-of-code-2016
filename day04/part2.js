var R = require('ramda');

var getCharCode = x => x.charCodeAt(0);
var toChar = String.fromCharCode;
var rotate = R.curry((sectorId, x) => x === '-' ? ' ' : toChar(((getCharCode(x) - 97 + sectorId) % 26) + 97));
var cipher = (code, sectorId) => R.pipe(R.map(rotate(sectorId)), R.join(''))(code);

var toRoom = (name, sectorId) => ({
        name: cipher(name, sectorId),
        sectorId: sectorId,
    });

var checksumsMatch = R.converge(R.equals, [R.prop('realChecksum'), R.prop('checksum')]);
var readLine = R.pipe(R.trim, R.match(/((?:[a-z]*-?)*)-(\d*)\[([a-z]*)\]/), R.tail, R.adjust(parseInt, 1), R.apply(toRoom));
var parseInput = R.pipe(R.trim, R.split('\n'), R.map(readLine));
var matchesName = R.pipe(R.prop('name'), R.equals('northpole object storage'));
var solution = R.pipe(parseInput, R.filter(checksumsMatch), R.find(matchesName), R.prop('sectorId'));

module.exports = solution;