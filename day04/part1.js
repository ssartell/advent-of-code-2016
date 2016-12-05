var R = require('ramda');

var byLengthDesc = R.comparator((a,b) => a.length > b.length);
var byValue = R.comparator((a,b) => a < b);
var getCheckSum = R.pipe(R.replace(/-/g, ''), R.groupBy(R.identity), R.values, R.sort(R.either(byLengthDesc, byValue)), R.map(R.head), R.take(5), R.join(''));

var toRoom = (name, sectorId, checksum) => ({
        realChecksum: getCheckSum(name),
        sectorId: sectorId,
        checksum: checksum
    });

var checksumsMatch = R.converge(R.equals, [R.prop('realChecksum'), R.prop('checksum')]); 
var readLine = R.pipe(R.trim, R.match(/((?:[a-z]*-?)*)-(\d*)\[([a-z]*)\]/), R.tail, R.adjust(parseInt, 1), R.apply(toRoom));
var parseInput = R.pipe(R.trim, R.split('\n'), R.map(readLine));
var solution = R.pipe(parseInput, R.filter(checksumsMatch), R.map(R.prop('sectorId')), R.sum);

module.exports = solution;