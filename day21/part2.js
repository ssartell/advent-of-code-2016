var R = require('ramda');

var lineRegex = /((?:swap position)|(?:swap letter)|(?:rotate based on position of letter)|(?:rotate left)|(?:rotate right)|(?:reverse positions)|(?:move position)) (\S)(?:(?: with position )|(?: steps)|(?: with letter )|(?: to position )|(?: through ))?(\S)?/;
var tryParseInt = x => isNaN(parseInt(x)) ? x : parseInt(x);
var readLine = R.pipe(R.match(lineRegex), R.tail, R.adjust(tryParseInt, 1), R.adjust(tryParseInt, 2), R.zipObj(['op', 'x', 'y']));
var parseInput = R.pipe(R.trim, R.split('\n'), R.map(readLine), R.reverse);

var shit = [7,0,4,1,5,2,6,3];
var operations = {
    'swap position': (inst, str) => {
        var x = Math.min(inst.x, inst.y);
        var y = Math.max(inst.x, inst.y);
        return str.substring(0, x) + str.charAt(y) + str.substring(x + 1, y) + str.charAt(x) + str.substring(y + 1);
    },
    'swap letter': (inst, str) => {
        var x = inst.x;
        var y = inst.y;
        var xRegex = new RegExp(x, 'g');
        var yRegex = new RegExp(y, 'g');
        var tempRegex = /_/g;
        var temp = R.replace(xRegex, '_', str);
        temp = R.replace(yRegex, x, temp);
        return R.replace(tempRegex, y, temp);
    },
    'rotate right': (inst, str) => {
        var length = inst.x
        return str.substr(length) + str.substr(0, length);
    },
    'rotate left': (inst, str) => {
        var length = inst.x
        return str.substr(str.length - length) + str.substr(0, str.length - length);
    },
    'rotate based on position of letter': (inst, str) => {
        var x = inst.x;
        var index = str.indexOf(x);
        var shift = ((index - shit[index]) + 8) % 8;
        return str.substr(shift) + str.substr(0, shift);
    },
    'reverse positions': (inst, str) => {
        var x = inst.x;
        var y = inst.y;
        return str.substring(0, x) + R.reverse(str.substring(x, y + 1)) + str.substring(y + 1);
    },
    'move position': (inst, str) => {
        var y = inst.x;
        var x = inst.y;
        var letter = str.charAt(x);
        str = str.substring(0, x) + str.substring(x + 1);
        return str.substring(0, y) + letter + str.substring(y);
    }
};

var scramble = R.curry((password, insts) => {
    for(var inst of insts) {
        password = operations[inst.op](inst, password);
    }

    return password;
});
var solution = R.pipe(parseInput, scramble('fbgdceah'));

module.exports = solution;