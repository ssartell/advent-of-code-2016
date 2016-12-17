var R = require('ramda');

var directions = [-1, 1];
var bottomFloor = 0;
var topFloor = 3;

var regex = /(?:a )(\S)\S* (\S)\S*/g;
var readLine = line => {
    var match,
        output = [];
    while(match = regex.exec(line)) {
        output.push(match[1] + match[2]);
    }

    return output;
}
var parseInput = R.pipe(R.trim, R.split('\n'), R.map(R.pipe(R.trim, readLine, R.sortBy(R.identity))));

var toString = JSON.stringify;
var fromString = JSON.parse;

var nChooseK = (set, n) => {
    if (n === 0) {
        return [[]];
    }
    
    if (set.length === n) {
        return [set];
    }
    
    var element = [R.head(set)];
    
    var haveNots = nChooseK(R.tail(set), n);
    var haves = R.map((set) => R.concat(element, set), nChooseK(R.tail(set), n - 1));
    
    return R.concat(haves, haveNots);
};

var isMicrochip = R.pipe(R.last, R.equals('m'));
var isGenerator = R.pipe(R.last, R.equals('g'));

var validFloors = {};
var floorIsValid = floor => {
    var floorKey = toString(floor);
    if (floorIsValid[floorKey]) 
        return floorIsValid[floorKey];

    var generators = R.filter(isGenerator, floor);
    if (generators.length === 0)  {
        floorIsValid[floorKey] = true;
        return true;
    }
    var microchips = R.filter(isMicrochip, floor);
    for(var microchip of microchips) {
        var type = microchip[0];
        if (!R.contains(type + 'g', generators)) {
            floorIsValid[floorKey] = false;
            return false;
        }
    }

    floorIsValid[floorKey] = true;
    return true;
};

var createNewState = (oldState, fromElev, toElev, fromFloor, toFloor) => {
    var floors = R.update(fromElev, R.sortBy(R.identity, fromFloor), oldState.floors);
    floors = R.update(toElev, R.sortBy(R.identity, toFloor), floors);

    return {
        steps: oldState.steps + 1,
        elev: toElev,
        floors: floors
    };
};

var isFinal = state => state.floors[0].length === 0 && state.floors[1].length === 0 && state.floors[2].length === 0;

var oldStates = {};
var oldSteps = {};
var queue = [];
var tryMoves = initialFloors => {
    var initialState = {
        steps: 0,
        elev: 0,
        floors: initialFloors
    };
    queue.push(initialState);

    var state;
    while(state = queue.shift()) {
        var steps = state.steps;

        if (!oldSteps[steps]) {
            oldSteps[steps] = steps;
            console.log(steps);
        }

        var fromElev = state.elev;
        var fromFloor = state.floors[fromElev];

        var options;
        if (fromFloor.length > 1) {
            options = R.concat(nChooseK(fromFloor, 2), nChooseK(fromFloor, 1));
        } else {
            options = [fromFloor];
        }
        
        for(var direction of directions) {
            var toElev = state.elev + direction;
            if (toElev < bottomFloor || topFloor < toElev) continue;
            
            var toFloor = state.floors[toElev];

            for(var option of options) {
                var updatedToFloor = R.concat(toFloor, option);
                if (!floorIsValid(updatedToFloor)) continue;

                var updatedFromFloor = R.without(option, fromFloor);
                if (!floorIsValid(updatedFromFloor)) continue;

                var newState = createNewState(state, fromElev, toElev, updatedFromFloor, updatedToFloor);
                if (isFinal(newState)) return newState.steps;

                var newFloorState = toString(newState.floors) + toElev;
                if (!oldStates[newFloorState]) {
                    oldStates[newFloorState] = true;
                    queue.push(newState);
                }
            }
        }
    }
    
    return Infinity;
};

var solution = R.pipe(parseInput, tryMoves);

module.exports = solution;