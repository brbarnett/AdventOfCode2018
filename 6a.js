const fs = require('fs'),
    _ = require('lodash');

class Solution {
    run() {
        // const input = fs.readFileSync('./6.dat', 'utf8');
        const input = `1, 1
        1, 6
        8, 3
        3, 4
        5, 5
        8, 9`;

        const result = this.solve(input);
        console.log('Result:', result);
    }

    solve(input) {
        const coords = _(input)
            .chain()
            .split('\n')
            .map(_ => _.split(', '))
            .map(_ => ({
                x: +_[0],
                y: +_[1]
            }))
            .value();

        return null;
    }

    getManhattanDistance(pointA, pointB) {
        
    }
}

module.exports = Solution;