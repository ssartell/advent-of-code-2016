var R = require('ramda');

var parseInput = R.pipe(R.trim, parseInt);

var buildElfChain = elvesCount => {
    var elf;
    var lastElf;
    var rootElf;
    for(var i = 1; i <= elvesCount; i++) {
        var elf = { i: i };
        if (lastElf) {
            lastElf.nextElf = elf;
        } else {
            rootElf = elf;
        }
        lastElf = elf;
    }
    lastElf.nextElf = rootElf;

    return rootElf;
}

var skipElves = (elf, n) => {
    var nextElf = elf;

    while(n != 0) {
        nextElf = nextElf.nextElf;
        n--;
    }

    return nextElf;
}

var exec = elvesCount => {
    var elf = buildElfChain(elvesCount);
    var beforeOppositeElf = skipElves(elf, Math.floor(elvesCount / 2) - 1);
    var stolen = 0;

    while(stolen < elvesCount - 1) {
        beforeOppositeElf.nextElf = beforeOppositeElf.nextElf.nextElf;
        if ((elvesCount - stolen) % 2 == 1) {
            beforeOppositeElf = beforeOppositeElf.nextElf;
        }
        elf = elf.nextElf;
        stolen++;        
    }
    
    return elf.i;
};

var solution = R.pipe(parseInput, exec);

module.exports = solution;