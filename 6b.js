const fs = require('fs'),
    _ = require('lodash');

class Solution {
    run() {
        const input = fs.readFileSync('./6.dat', 'utf8');

        const result = this.solve(input);
        console.log('Result:', result);
    }

    solve(input) {
        let i = 0;
        const coords = _(input)
            .chain()
            .split('\n')
            .map(_ => _.split(', '))
            .map(_ => ({
                id: i++,
                x: +_[0],
                y: +_[1]
            }))
            .value();

        const boundingBox = this.getBoundingBox(coords);

        let count = 0;
        for (let x = 0; x < boundingBox.x + 1; x++) {
            for (let y = 0; y < boundingBox.y; y++) {
                const totalDistance = _(coords)
                    .chain()
                    .map(_ => ({
                        point: _,
                        distance: this.getManhattanDistance(_, { x, y })
                    }))
                    .sumBy(_ => _.distance)
                    .value();

                if(totalDistance < 10000) 
                    count++;
            }
        }

        return count;
    }

    getBoundingBox(coords) {
        const x = _(coords)
            .chain()
            .map(_ => _.x)
            .max()
            .value();

        const y = _(coords)
            .chain()
            .map(_ => _.y)
            .max()
            .value();

        return { x, y };
    }

    getManhattanDistance(pointA, pointB) {
        const x = Math.abs(pointA.x - pointB.x);
        const y = Math.abs(pointA.y - pointB.y);

        return x + y;
    }
}

module.exports = Solution;