const fs = require('fs'),
    _ = require('lodash');

class Solution {
    run() {
        const input = fs.readFileSync('./5.dat', 'utf8');

        const result = this.solve(input);
        console.log('Result:', result);
    }

    solve(input) {
        const reduced = this.reducePolymer(input);

        return reduced.length;
    }

    reducePolymer(polymer) {
        let found = null;
        do {
            found = false;
            for (let i = 0; i < polymer.length - 1; i++) {
                if (Math.abs(polymer.charCodeAt(i) - polymer.charCodeAt(i + 1)) === 32) {
                    polymer = polymer.replace(polymer.substring(i, i + 2), '');
                    found = true;
                    break;
                }
            }
        }
        while (found);

        return polymer;
    }
}

module.exports = Solution;