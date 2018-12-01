const fs = require('fs'),
    _ = require('lodash');

class Solution {
    run() {
        const input = fs.readFileSync('./1.dat', 'utf8');

        const result = this.applyAdjustments(input);
        console.log('Result:', result);
    }

    applyAdjustments(input) {
        const arr = _(input)
            .chain()
            .split('\n')    // split by line break
            .map(x => +x)   // convert all to numbers
            .value();

        let frequency = 0;
        let history = [frequency];
        let position = 0;
        while (true) {
            frequency += arr[position];

            if (history.includes(frequency)) break;
            history.push(frequency);

            position++; // increment array position
            if(position >= arr.length) position = 0;    // reset
        }

        return frequency;
    }
}

module.exports = Solution;