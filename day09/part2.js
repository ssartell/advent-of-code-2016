var R = require('ramda');

var solution = input => {
    var i = 0;
    var total = 0;
    while(i < input.length) {
        var char = input[i];
        if (char === '(') {
            var x = input.indexOf('x', i);
            var close = input.indexOf(')', i);
            
            var span = parseInt(input.substring(i + 1, x));
            var times = parseInt(input.substring(x + 1, close));
            var markerLength = close - i + 1;

            var decompressedSpan = solution(input.substr(i + markerLength, span));

            total += decompressedSpan * times;
            i += markerLength + span;
        } else {
            total++;
            i++;
        }
    }

    return total;
};

module.exports = solution;