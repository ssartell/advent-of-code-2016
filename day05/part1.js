var R = require('ramda');
var md5 = require('md5');

var solution = input => {
    var password = '',
        i = 0;
    for(var j = 0; j < 8; j++) {
        var hash = '';
        while(!hash.startsWith('00000')) {
            hash = md5(input + i);
            i++;
         }
        password += hash[5];
    }
    return password;
}

module.exports = solution;