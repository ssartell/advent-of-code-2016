var R = require('ramda');
var md5 = require('md5');

var isOpen = x => x === 'b' || x === 'c' || x === 'd' || x === 'e' || x === 'f';

var queue = [];
var works = [];
var exec = input => {
    var start = { x: 0, y: 0, seq: '' };
    queue.push(start);

    var pos;
    while(pos = queue.shift()) {
        if (pos.x === 3 && pos.y === 3) {
            works.push(pos);
            continue;
        }
        if (pos.x < 0 || pos.x > 3) continue;
        if (pos.y < 0 || pos.y > 3) continue;

        var hash = md5(input + pos.seq);
        
        if (isOpen(hash[0])) queue.push({ x: pos.x, y: pos.y - 1, seq: pos.seq + 'U' });
        if (isOpen(hash[1])) queue.push({ x: pos.x, y: pos.y + 1, seq: pos.seq + 'D' });
        if (isOpen(hash[2])) queue.push({ x: pos.x - 1, y: pos.y, seq: pos.seq + 'L' });
        if (isOpen(hash[3])) queue.push({ x: pos.x + 1, y: pos.y, seq: pos.seq + 'R' });
    }

    return R.last(works).seq.length;
};

var solution = R.pipe(R.trim, exec);

module.exports = solution;