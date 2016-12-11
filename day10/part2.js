var R = require('ramda');

var trace = x => {
    return x;
};

var reg = /(\w*)\s(?:(?:(\d*) gives low to (\w*) (\d*) and high to (\w*) (\d*))|(?:(\d*) goes to bot (\d*)))/;
var props = ['op', 'botFrom', 'lowType', 'lowTo', 'highType', 'highTo', 'val', 'valTo'];
var parseInput = R.pipe(R.trim, R.split('\n'), R.map(R.pipe(R.match(reg), R.tail, R.zipObj(props))));

var bots = {};
var outputs = {};

var toOpsLookup = ops => ({
    valOps: R.filter(R.pipe(R.prop('op'), R.equals('value')))(ops),
    botOps: R.pipe(R.filter(R.pipe(R.prop('op'), R.equals('bot'))), R.indexBy(R.prop('botFrom')))(ops)
});

var evalType = (ops, type, to, val) => {
    if (type === 'bot') {
        addValToBot(ops, to, val);
    } else {
        outputs[to] = val;
    }
}

var evalBotOp = (bot, ops) => {
    var botOp = ops.botOps[bot];
    var botVals = bots[bot];
    var low = R.apply(R.min, botVals);
    var high = R.apply(R.max, botVals);

    evalType(ops, botOp.lowType, botOp.lowTo, low);
    evalType(ops, botOp.highType, botOp.highTo, high);
}

var evalValOp = (op, ops) => {
    var val = parseInt(op.val);
    addValToBot(ops, op.valTo, val)
}

function addValToBot(ops, bot, val) {
    if (bots[bot] === undefined) {
        bots[bot] = [val];
    } else {
        bots[bot].push(val);

        if (bots[bot].length === 2) {
            evalBotOp(bot, ops);
        }
    }
}

var toOutputs = R.curry((ops) => {
    for(var op of ops.valOps) {
        evalValOp(op, ops);
    }

    return outputs;
});

var multiplyOutputs = outs => R.pipe(R.pick(outs), R.values, R.reduce(R.multiply, 1));

var solution = R.pipe(parseInput, toOpsLookup, toOutputs, multiplyOutputs([0,1,2]));

module.exports = solution;