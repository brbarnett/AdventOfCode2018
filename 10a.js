const fs = require('fs'),
    _ = require('lodash');

class Solution {
    run() {
        // const input = fs.readFileSync('./10.dat', 'utf8');
        const input = `position=< 9,  1> velocity=< 0,  2>
        position=< 7,  0> velocity=<-1,  0>
        position=< 3, -2> velocity=<-1,  1>
        position=< 6, 10> velocity=<-2, -1>
        position=< 2, -4> velocity=< 2,  2>
        position=<-6, 10> velocity=< 2, -2>
        position=< 1,  8> velocity=< 1, -1>
        position=< 1,  7> velocity=< 1,  0>
        position=<-3, 11> velocity=< 1, -2>
        position=< 7,  6> velocity=<-1, -1>
        position=<-2,  3> velocity=< 1,  0>
        position=<-4,  3> velocity=< 2,  0>
        position=<10, -3> velocity=<-1,  1>
        position=< 5, 11> velocity=< 1, -2>
        position=< 4,  7> velocity=< 0, -1>
        position=< 8, -2> velocity=< 0,  1>
        position=<15,  0> velocity=<-2,  0>
        position=< 1,  6> velocity=< 1,  0>
        position=< 8,  9> velocity=< 0, -1>
        position=< 3,  3> velocity=<-1,  1>
        position=< 0,  5> velocity=< 0, -1>
        position=<-2,  2> velocity=< 2,  0>
        position=< 5, -2> velocity=< 1,  2>
        position=< 1,  4> velocity=< 2,  1>
        position=<-2,  7> velocity=< 2, -2>
        position=< 3,  6> velocity=<-1, -1>
        position=< 5,  0> velocity=< 1,  0>
        position=<-6,  0> velocity=< 2,  0>
        position=< 5,  9> velocity=< 1, -2>
        position=<14,  7> velocity=<-2,  0>
        position=<-3,  6> velocity=< 2, -1>`;

        this.writeResult(this.solve(input));
    }

    solve(input) {
        let arr = _(input)
            .chain()
            .split('\n')
            .map(_ => this.parseInput(_.trim()))
            .value();

        let boundingBox = this.getBoundingBox(arr.map(_ => _.position));
        let lastArea = boundingBox.area;

        let history = [arr];
        while (true) {
            let local = history[history.length - 1].slice(0);   // clone last array
            _.forEach(local, _ => {
                _.position.x += _.velocity.x;
                _.position.y += _.velocity.y;
            });

            boundingBox = this.getBoundingBox(local.map(_ => _.position));

            if (boundingBox.area > lastArea) break;

            lastArea = boundingBox.area;
            history.push(local);
        }

        return history[history.length - 1];
    }

    parseInput(line) {
        let parsed = line.match(/position=<(.+),(.+)> velocity=<(.+),(.+)>/);

        return {
            position: { x: +parsed[1], y: +parsed[2] },
            velocity: { x: +parsed[3], y: +parsed[4] },
            raw: parsed[0]
        };
    }

    getBoundingBox(positions) {
        let xs = positions.map(_ => _.x);
        let ys = positions.map(_ => _.y);

        let x0 = _.min(xs);
        let y0 = _.min(ys);
        let x1 = _.max(xs);
        let y1 = _.max(ys);

        return {
            x0,
            y0,
            x1,
            y1,
            area: Math.abs(x1 - x0) * Math.abs(y1 - y0)
        };
    }

    writeResult(arr) {
        let boundingBox = this.getBoundingBox(arr.map(_ => _.position));
        for (let i = boundingBox.y0; i <= boundingBox.y1; i++) {
            let rowstring = '';
            for (let j = boundingBox.x0; j <= boundingBox.x1; j++) {
                if (_.some(arr, _ => _.position.x === j && _.position.y === i))
                    rowstring += '#';
                else 
                    rowstring += '.';
            }
            console.log(rowstring);
        }
    }
}

module.exports = Solution;