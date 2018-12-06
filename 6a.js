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

        let infinite = new Set();
        let counts = _.fill(new Array(coords.length), 0);
        for (let x = 0; x < boundingBox.x + 1; x++) {
            for (let y = 0; y < boundingBox.y; y++) {
                const distances = _(coords)
                    .chain()
                    .map(_ => ({
                        point: _,
                        distance: this.getManhattanDistance(_, { x, y })
                    }))
                    .orderBy(_ => _.distance)
                    .value();

                const minDistance = _.minBy(distances, _ => _.distance).distance;

                const points = _.filter(distances, _ => _.distance === minDistance);

                if (points.length === 1) {
                    counts[points[0].point.id] += 1;

                    if (x === 0
                        || y === 0
                        || x === boundingBox.x
                        || y === boundingBox.y)
                        infinite.add(points[0].point.id);
                }
            }
        }

        return _(counts)
            .chain()
            .filter((_, key) => !infinite.has(key))
            .max(_ => _.distance)
            .value();
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