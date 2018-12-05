const fs = require('fs'),
    _ = require('lodash');

String.prototype.replaceAll = function (strReplace, strWith) {
    // See http://stackoverflow.com/a/3561711/556609
    var esc = strReplace.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    var reg = new RegExp(esc, 'ig');
    return this.replace(reg, strWith);
};

class Solution {
    run() {
        const input = fs.readFileSync('./5.dat', 'utf8');

        const result = this.solve(input);
        console.log('Result:', result);
    }

    solve(input) {
        const polymer = _(input.toLowerCase())
            .chain()
            .uniq()
            .sort()
            .map(x => ({
                letter: x,
                reduced: this.reducePolymer(input.replaceAll(x, ''))
            }))
            .minBy(x => x.reduced.length)
            .value();

        return polymer.reduced.length;
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