const fs = require('fs'),
    _ = require('lodash');

class Solution {
    run() {
        const input = fs.readFileSync('./3.dat', 'utf8');

        const result = this.solve(input);
        console.log('Result:', result);
    }

    solve(input) {
        const claims = this.parseInput(input);
        const size = this.getFabricBounds(claims);

        let grid = new Array(size);
        for (let i = 0; i < grid.length; i++) {
            grid[i] = _.fill(Array(size), 0);
        }

        _.forEach(claims, claim => {
            for (let x = claim.left; x < claim.left + claim.width; x++) {
                for (let y = claim.top; y < claim.top + claim.height; y++) {
                    grid[y][x] += 1;    // increment every square inch for every claim
                }
            }
        });

        return _(grid)
                .chain()
                .flatten()
                .countBy(x => x > 1)
                .value()
                .true;
    }

    parseInput(input) {
        const exp = /#(\d+) @ (\d+),(\d+): (\d+)x(\d+)/;

        const arr = _(input)
            .chain()
            .split('\n')    // split by line break
            .map(x => {
                const params = x.match(exp);

                return {
                    raw: params[0],
                    claim: +params[1],
                    left: +params[2],
                    top: +params[3],
                    width: +params[4],
                    height: +params[5]
                };
            })
            .value();

        return arr;
    }

    getFabricBounds(claims) {
        const maxWidthClaim = _.maxBy(claims, x => x.left + x.width);
        const maxHeightClaim = _.maxBy(claims, x => x.top + x.height);

        const maxWidth = maxWidthClaim.left + maxWidthClaim.width;
        const maxHeight = maxHeightClaim.top + maxHeightClaim.height

        const size = Math.max(maxWidth, maxHeight);

        return size;
    }
}

module.exports = Solution;