var R = require('ramda');

var registers = {
    a: 12,
    b: 0,
    c: 0,
    d: 0
};

var isRegister = x => !isFinite(x);
var valueOrRegister = x => isRegister(x) ? registers[x] : x;
var tryParseInt = x => isNaN(parseInt(x)) ? x : parseInt(x);

var readLine = R.pipe(R.trim, R.match(/(\w*) (-?\w*)(?: (-?\w*))?/), R.tail, R.map(tryParseInt), R.zipObj(['op', 'x', 'y']));
var parseInput = R.pipe(R.trim, R.split('\n'), R.map(readLine));

var exec = code => {
    var i = 0;

    var ops = {
        cpy: inst => {
            if (isRegister(inst.y)) {
                registers[inst.y] = valueOrRegister(inst.x);
            }
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
                i += valueOrRegister(inst.y);
            } else {
                i++;
            }                
        },
        tgl: instA => {
            var instB = code[i + valueOrRegister(instA.x)];
            if (instB) {
                if (instB.y === undefined) {
                    if (instB.op === 'inc') {
                        instB.op = 'dec';
                    } else {
                        instB.op = 'inc';
                    }
                } else {
                    if (instB.op === 'jnz') {
                        instB.op = 'cpy';
                    } else {
                        instB.op = 'jnz';
                    }
                }
            }
            i++;
        }
    };

    while (0 <= i && i < code.length) {
        var inst = code[i];
        ops[inst.op](inst);
    }

    return registers['a'];
}

var solution = R.pipe(parseInput, exec);

module.exports = solution;