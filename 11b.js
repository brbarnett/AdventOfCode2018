const fs = require('fs'),
    _ = require('lodash');

class Solution {
    run() {
        const input = 7857;

        const result = this.solve(input);
        console.log('Result:', result);
    }

    solve(serialNumber) {
        // build grid
        let grid = [];
        for (let y = 1; y <= 300; y++) {
            let row = [];
            for (let x = 1; x <= 300; x++) {
                let rackId = x + 10;
                let powerLevel = rackId * y;
                powerLevel += serialNumber;
                powerLevel *= rackId;
                powerLevel = Math.floor((powerLevel / 100) % 10);
                powerLevel -= 5;

                row.push(powerLevel);
            }
            grid.push(row);
        }

        let max = 0;
        let maxCoord = { x: null, y: null, size: null };
        for (let y = 0; y < 300; y++) {
            for (let x = 0; x < 300; x++) {
                for (let size = 1; size < 300 - Math.max(x, y); size++) {
                    let localMax = 0;
                    for(let i = 0; i < size; i++) {
                        localMax += _.sum(grid[y + i].slice(x, x + size));
                    }

                    if(localMax > max) {
                        max = localMax;
                        maxCoord = { x: x + 1, y: y + 1, size };
                    }
                }
            }
        }

        return maxCoord;
    }
}

module.exports = Solution;