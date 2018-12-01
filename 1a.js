const fs = require('fs'),
    _ = require('lodash');

class Solution {
    run() {
        const input = fs.readFileSync('./1.dat', 'utf8');

        const result = this.applyAdjustments(input);
        console.log('Result:', result);
    }

    applyAdjustments(input) {
        console.log(input);
        const arr = _(input)
            .chain()
            .split('\n')    // split by line break
            .map(x => +x)   // convert all to numbers
            .value();

        const result = arr.reduce((acc, cur) => acc + cur);

        return result;
    }
}

module.exports = Solution;