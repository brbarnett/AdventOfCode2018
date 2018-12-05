const fs = require('fs'),
    _ = require('lodash');

class Solution {
    run() {
        const input = fs.readFileSync('./5.dat', 'utf8');

        const result = this.solve(input);
        console.log('Result:', result);
    }

    solve(input) {
        let found = null;
        do {
            found = false;
            for (let i = 0; i < input.length - 1; i++) {
                if (Math.abs(input.charCodeAt(i) - input.charCodeAt(i + 1)) === 32) {
                    input = input.replace(input.substring(i, i + 2), '');
                    found = true;
                    break;
                }
            }
        }
        while (found);

        return input.length;
    }
}

module.exports = Solution;