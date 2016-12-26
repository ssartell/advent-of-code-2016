var R = require('ramda');

var registers;
var isRegister = x => !isFinite(x);
var valueOrRegister = x => isRegister(x) ? registers[x] : x;
var tryParseInt = x => isNaN(parseInt(x)) ? x : parseInt(x);

var readLine = R.pipe(R.trim, R.match(/(\w+)(?: (-?\w+)(?: (-?\w+))?)?/), R.tail, R.map(tryParseInt), R.zipObj(['op', 'x', 'y']));
var parseInput = R.pipe(R.trim, R.split('\n'), R.map(readLine));

var exec = code => {
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
        out: inst => {
            out += valueOrRegister(inst.x);
            i++;
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

    var j = 0;
    while(true) {
        var i = 0;
        registers = { a: j, b: 0, c: 0, d: 0 };
        var out = '';

        while (0 <= i && i < code.length) {
            var inst = code[i];
            ops[inst.op](inst);

            if (inst.op === 'out') {
                var expected = (out.length % 2 + 1) % 2 + '';
                if (out.length > 1 && expected != out[out.length - 1]){
                    break;
                }

                if (out.length === 20) return j;
            }
        }

        j++;
    }
    

    return registers['a'];
}

var solution = R.pipe(parseInput, exec);

module.exports = solution;