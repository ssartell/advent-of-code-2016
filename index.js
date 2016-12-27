var R = require('ramda');
var fs = require('fs');
var Stopwatch = require("node-stopwatch").Stopwatch;

function pad(digit, width, char) {
  char = char || '0';
  digit = digit + '';
  return digit.length >= width ? digit : new Array(width - digit.length + 1).join(char) + digit;
}

function run(day, part) {
	day = pad(day, 2);
	var input = fs.readFileSync('day' + day + '/input.txt', 'utf8');
	var solution = require('./day' + day + '/part' + part);

	var stopwatch = Stopwatch.create();
	stopwatch.start();
	
	var answer = solution(input);
	
	stopwatch.stop();
	
	console.log('day ' + day + ', part ' + part + ' : ' + stopwatch.elapsed.seconds + 's');
	console.log(answer);
}

var day = 24;
run(day, 1);
// run(day, 2);

process.exit();
