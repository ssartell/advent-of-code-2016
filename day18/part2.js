var R = require('ramda');

var parseInput = R.pipe(R.trim, R.split(''), R.map(R.equals('^')));

var isTrap = (l,c,r) => {
    return (l && c && !r) || (c && r && !l) || (l && !c && !r) || (!l && !c && r) || false;
};

var countTraps = R.curry((rows, input) => {
    var row = input;
    var sum = row.length - R.sum(row);
    for(var i = 1; i < rows; i++) {
        var newRow = [];
        for(var j = 0; j < row.length; j++){
            var tileIsTrap = isTrap(row[j-1], row[j], row[j+1]);
            newRow[j] = tileIsTrap;
            sum += !tileIsTrap;
        }
        row = newRow;
    }

    return sum;
});

var solution = R.pipe(parseInput, countTraps(400000));

module.exports = solution;