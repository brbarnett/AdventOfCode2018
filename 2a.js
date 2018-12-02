const fs = require('fs'),
    _ = require('lodash');

class Solution {
    run() {
        const input = fs.readFileSync('./2.dat', 'utf8');

        const result = this.solve(input);
        console.log('Result:', result);
    }

    readCode(code) {
        const counts = _.countBy(code);

        const result = {
            two: _.some(Object.keys(counts), key => counts[key] === 2),
            three: _.some(Object.keys(counts), key => counts[key] === 3)
        };

        return result;
    }

    solve(input) {
        const arr = _(input)
            .chain()
            .split('\n')    // split by line break
            .value();

        const counts = _(arr)
            .chain()
            .map(x => this.readCode(x))
            .reduce((acc, cur) => {
                acc.two += +cur.two;
                acc.three += +cur.three;

                return acc;
            }, { two: 0, three: 0 })
            .value();

        return counts.two * counts.three;
    }
}

module.exports = Solution;