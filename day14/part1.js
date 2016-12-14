var R = require('ramda');
var md5 = require('md5');

var parseInput = R.pipe(R.trim);

var findTriple = hash => {
    var triple = [];
    var match = /(\S)\1{2}/g.exec(hash)
    if (match) {
        var char = match[1];
        return char + char + char + char + char
    }
    return null;
}

var hasFive = hash => {
    return /(\S)\1{4}/g.exec(hash);
}

var exec = salt => {
    var i = 0;
    var keys = [];
    var possibleKeys = [];
    while (keys.length < 64) {
        var hash = md5(salt + i);

        // clear off old keys
        while(possibleKeys.length != 0 && possibleKeys[0].index < i - 1000) {
            possibleKeys.shift();
        }

        var addedKeys = [];
        if (hasFive(hash)) {
            for(var possibleKey of possibleKeys) {
                if (hash.indexOf(possibleKey.triple) > -1) {
                    keys.push(possibleKey);
                    addedKeys.push(possibleKey);
                }
            }

            if (addedKeys.length > 0) {
                possibleKeys = R.without(addedKeys, possibleKeys);
            }
        }

        var triple = findTriple(hash);
        if (triple) {
            possibleKeys.push({
                index: i,
                triple: triple,
                hash: hash,
            });
        }
        
        i++;
    }
    keys = R.sortBy(x => x.index, keys);
    return keys[63].index;
}

var solution = R.pipe(parseInput, exec);

module.exports = solution;