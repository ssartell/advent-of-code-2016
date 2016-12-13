var outputMaze = maze => {
    for(var i = 0; i < maze.length; i++) {
        var rowStr = '';
        for(var j = 0; j < maze[i].length; j++) {
            if (maze[i] === undefined || maze[i][j] === undefined) {
                rowStr += ' ';
            } else if (maze[i][j] === -1) {
                rowStr += '#';
            } else {
                rowStr += '_';
            }
        }
        console.log(rowStr);
    }
};

module.exports = {
    outputMaze: outputMaze
};