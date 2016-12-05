var R = require('ramda');

var rotate = R.curry((id, x) => x == '-' ? ' ' : String.fromCharCode(((x.charCodeAt(0) - 97 + id) % 26) + 97));
var cipher = (name, id) => R.pipe(R.map(rotate(id)), R.join(''))(name);
var toRoom = (name, id) => ({ name: cipher(name, id), sectorId: id });
var readLine = R.pipe(R.trim, R.match(/((?:[a-z]*-?)*)-(\d*)/), R.tail, R.adjust(parseInt, 1), R.apply(toRoom));
var parseInput = R.pipe(R.trim, R.split('\n'), R.map(readLine));
var matchesName = R.pipe(R.prop('name'), R.equals('northpole object storage'));
var solution = R.pipe(parseInput, R.find(matchesName), R.prop('sectorId'));

module.exports = solution;