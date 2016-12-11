var R = require('ramda');

var trace = x => {
    return x;
};

var reg = /(\w*)\s(?:(?:(\d*) gives low to (\w*) (\d*) and high to (\w*) (\d*))|(?:(\d*) goes to bot (\d*)))/;
var props = ['op', 'botFrom', 'lowType', 'lowTo', 'highType', 'highTo', 'val', 'valTo'];
var parseInput = R.pipe(R.trim, R.split('\n'), R.map(R.pipe(R.match(reg), R.tail, R.zipObj(props))));

var bots = {};

var toOpsLookup = ops => ({
    valOps: R.filter(R.pipe(R.prop('op'), R.equals('value')))(ops),
    botOps: R.pipe(R.filter(R.pipe(R.prop('op'), R.equals('bot'))), R.indexBy(R.prop('botFrom')))(ops)
});

var evalBotOp = (c1, c2, bot, ops) => {
    var botOp = ops.botOps[bot];
    var botVals = bots[bot];
    var low = R.apply(R.min, botVals);
    var high = R.apply(R.max, botVals);

    if (high === c1 && low === c2) {
        return bot;
    }

    var lowBotRet = addValToBot(c1, c2, ops, botOp.lowTo, low);
    if (lowBotRet) return lowBotRet;

    var highBotRet = addValToBot(c1, c2, ops, botOp.highTo, high);
    if (highBotRet) return highBotRet

    return null;
}

var evalValOp = (c1, c2, op, ops) => {
    var val = parseInt(op.val);
    return addValToBot(c1, c2, ops, op.valTo, val)
}

function addValToBot(c1, c2, ops, bot, val) {
    if (bots[bot] === undefined) {
        bots[bot] = [val];
    } else {
        bots[bot].push(val);

        if (bots[bot].length === 2) {
            return evalBotOp(c1, c2, bot, ops);
        }
    }
}

var getBot = R.curry((c1, c2, ops) => {
    for(var op of ops.valOps) {
        var ret = evalValOp(c1, c2, op, ops);
        if (ret) return ret;
    }

    return null;
});

var solution = R.pipe(parseInput, toOpsLookup, getBot(61, 17));

module.exports = solution;