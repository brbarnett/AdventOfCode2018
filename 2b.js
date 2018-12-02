const fs = require('fs'),
    _ = require('lodash');

class Solution {
    run() {
        const input = fs.readFileSync('./2.dat', 'utf8');

        const result = this.solve(input);
        console.log('Result:', result);
    }

    solve(input) {
        const arr = _(input)
            .chain()
            .split('\r\n')    // split by line break
            .map(x => x.trim())
            .value();

        for(let i = 0; i < arr.length; i++) {
            for(let j = i; j < arr.length; j++) {
                const oneOff = this.compareStrings(arr[i], arr[j]);
                
                if(oneOff){
                    const intersection = _.intersection(arr[i].split(''), arr[j].split(''));
                    return intersection.join('');
                }
            }
        }
    }

    compareStrings(str1, str2) {
        const result = _(str1.split(''))
            .chain()
            .zip(str2.split(''))
            .map(x => x[0] === x[1])    // check equality at each position
            .countBy(x => x)    // count number of `false` results
            .value();

        return result.false === 1;
    }
}

module.exports = Solution;