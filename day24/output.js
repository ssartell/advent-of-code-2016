var ansi = require('ansi'),
    cursor = ansi(process.stdout);

var dontShow = false;

var printMaze = maze => {
    cursor.flush();
    if (dontShow) return;

    for(var y = 0; y < maze[0].length; y++) {
        var row = '';
        for(var x = 0; x < maze.length; x++) {
            row += maze[x][y];
        }
        cursor.white().goto(1, y + 1).write(row);
    }
    cursor.reset();
}

var printPos = pos => {
    if (dontShow) return;

    cursor.red().goto(pos.x + 1, pos.y + 1).write('@');
    cursor.reset();
}

var printHistory = (history, wait) => {
    for(var pos of history) {
        cursor.green().goto(pos.x + 1, pos.y + 1).write('@');
        if (wait) sleep(wait);
    }
    cursor.reset();
}

var gotoEnd = maze => {
    cursor.goto(1, maze[0].length + 1);
}

var sleep = function(time) {
    if (dontShow) return;

    var stop = new Date().getTime();
    while(new Date().getTime() < stop + time) {
        ;
    }
};

module.exports = {
    printMaze: printMaze,
    printPos: printPos,
    printHistory: printHistory,
    sleep: sleep,
    gotoEnd: gotoEnd
}