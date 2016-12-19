var R = require('ramda');

var parseInput = R.pipe(R.trim, parseInt);

var buildElfChain = elvesCount => {
    var elf;
    var lastElf;
    var rootElf;
    for(var i = 1; i <= elvesCount; i++) {
        var elf = { i: i };
        if (lastElf) {
            elf.prevElf = lastElf;
            lastElf.nextElf = elf;
        } else {
            rootElf = elf;
        }
        lastElf = elf;
    }
    lastElf.nextElf = rootElf;
    rootElf.prevElf = lastElf;

    return rootElf;
}

var skipElves = (elf, n) => {
    var nextElf = elf;

    for(var i = 0; i < n - 1; i++) {
        nextElf = nextElf.nextElf;
    }

    return nextElf;
}

var mod = (x, y) => ((x % y) + y) % y;

var exec = elvesCount => {
    elvesCount = 5;
    var elves = R.range(0, elvesCount);
    elves = R.map(x => [mod(x - 1, elvesCount), mod(x + 1, elvesCount)], elves);

    var stolen = 0;
    var log = 0;
    var i = 0;
    while(stolen < elvesCount - 1) {
        if (log === 100) {
            console.log(stolen);
            log = 0;
        }
        log++;
        var jump = Math.floor((elvesCount - stolen) / 2);
        elves[jump]
        stolen++;
        
    }
    
    return elf.i;
};

var solution = R.pipe(parseInput, exec);

module.exports = solution;