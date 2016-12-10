var R = require('ramda');

var parseInput = R.pipe(R.trim, R.split('\n'), R.map(R.pipe(R.trim, R.match(/(\w*)\s(?:(\d*)x(\d)*)?(?:(\w*)\s\w\=(\d*)\sby\s(\d*))?/), R.tail)))

var new2dArray = (w, h) => {
    var x = new Array(w);
    for (var i = 0; i < w; i++) {
        x[i] = R.repeat(0, h);
    }
    return x;
}

var evalRect = (w, h, a) => {
    for(var x = 0; x < w; x++) {
        for(var y = 0; y < h; y++) {
            a[x][y] = 1;
        }
    }
    return a;
}

var rotateArray = R.curry((by, a) => {
    return R.converge(R.concat, [R.takeLast(by), R.take(a.length - by)])(a);
});
var evalRotateRow = (row, by, a) => {
    return R.pipe(R.transpose, R.adjust(rotateArray(by), row), R.transpose)(a);
};
var evalRotateCol = (col, by, a) => {
    return R.adjust(rotateArray(by), col)(a);
};
var evalOp = (a, x) => {
    var op = R.head(x);
    if (op === 'rect') {
        return evalRect(parseInt(x[1]), parseInt(x[2]), a);
    } else {
        var rowCol = x[3];
        var i = parseInt(x[4]);
        var by = parseInt(x[5]);
        if (rowCol === 'row') {
            return evalRotateRow(i, by, a)
        } else {
            return evalRotateCol(i, by, a);
        }
    }
};
var evalOps = R.pipe(R.reduce(evalOp, new2dArray(50, 6)))
var concatArray = R.reduce(R.concat, '');
var output = R.pipe(R.transpose, R.map(R.pipe(concatArray, R.concat(R.__, '\n'))), concatArray, R.concat('\n'), R.replace(/0/g, ' '));

var solution = R.pipe(parseInput, evalOps, output);

module.exports = solution;