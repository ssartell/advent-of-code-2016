var R = require('ramda');
var FastQueue = require('fastqueuejs');

var parseInput = R.pipe(R.trim, parseInt);

var exec = elvesCount => {
    var elves = R.range(1, elvesCount + 1);
    var queue = new FastQueue(elvesCount + 2);

    for(var elf of elves) {
        queue.enqueue(elf);
    }
    
    while(queue.getLength() > 1) {
        var elf = queue.dequeue();
        var nextElf = queue.dequeue();
        queue.enqueue(elf);
    }

    return queue.peek();
}

var solution = R.pipe(parseInput, exec);

module.exports = solution;