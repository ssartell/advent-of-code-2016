var R = require('ramda');
var md5 = require('md5');

var solution = input => {
    var password = [],
        i = 0,
        found = 0;
    while(found < 8) {
        var hash = '';
        while(!hash.startsWith('00000')) {
            hash = md5(input + i);
            i++;
        }
        var index = parseInt(hash[5]);
        if (!isNaN(index) && (index <= 7) && !password[index]) {
            password[index] = hash[6];
            found++;
        }
    }
    return R.join('', password);
}

module.exports = solution;