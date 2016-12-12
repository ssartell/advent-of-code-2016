var R = require('ramda');

var registers = {
    a: 0,
    b: 0,
    c: 0,
    d: 0
};

var isRegister = x => !isFinite(x);
var valueOrRegister = x => isRegister(x) ? registers[x] : x;

var tryParseInt = x => {
    var int = parseInt(x);
    if (isNaN(int)) {
        return x;
    } else {
        return int;
    }
};

var fields = ['inst', 'x', 'y'];
var parseInput = R.pipe(R.trim, R.split('\n'), R.map(R.pipe(R.trim, R.match(/(\w*) (\w*)(?: (-?\w*))?/), R.tail, R.adjust(tryParseInt, 1), R.adjust(tryParseInt, 2), R.zipObj(fields))));

var exec = code => {
    var i = 0;

    var funcs = {
        cpy: inst => { 
            registers[inst.y] = valueOrRegister(inst.x);
            i++;
        },
        inc: inst => {
            registers[inst.x]++;
            i++;
        },
        dec: inst => {
            registers[inst.x]--;
            i++;
        },
        jnz: inst => {
            if (valueOrRegister(inst.x) !== 0) {
                i += inst.y;
            } else {
                i++;
            }                
        },
    };

    while (0 <= i && i < code.length) {
        var line = code[i];
        funcs[line.inst](line);
    }

    return registers['a'];
}

var solution = R.pipe(parseInput, exec);

module.exports = solution;