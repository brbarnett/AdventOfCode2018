const fs = require('fs'),
    _ = require('lodash');

class Solution {
    run() {
        const input = fs.readFileSync('./7.dat', 'utf8');

        const result = this.solve(input);
        console.log('Result:', result);
    }

    solve(input) {
        const coords = _(input)
            .chain()
            .split('\n')

            .value();

    }
}

module.exports = Solution;