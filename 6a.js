const fs = require('fs'),
    _ = require('lodash');

class Solution {
    run() {
        // const input = fs.readFileSync('./6.dat', 'utf8');
        const input = `1, 1
        1, 6
        8, 3
        3, 4
        5, 5
        8, 9`;

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

        let rows = new Array(boundingBox.y);
        for (let i = 0; i < boundingBox.y; i++) {
            rows[i] = _.fill(Array(boundingBox.x), null);
        }

        for (let x = 0; x < boundingBox.x; x++) {
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

                if (points.length === 1)
                    rows[y][x] = points[0].point.id;
                else rows[y][x] = null;
            }
        }

        return null;
    }

    getBoundingBox(coords) {
        const x = _(coords)
            .chain()
            .map(_ => _.x)
            .max()
            .value() + 1;

        const y = _(coords)
            .chain()
            .map(_ => _.y)
            .max()
            .value() + 1;

        return { x, y };
    }

    getManhattanDistance(pointA, pointB) {
        const x = Math.abs(pointA.x - pointB.x);
        const y = Math.abs(pointA.y - pointB.y);

        return x + y;
    }
}

module.exports = Solution;