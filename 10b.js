const fs = require('fs'),
    _ = require('lodash');

class Solution {
    run() {
        const input = fs.readFileSync('./10.dat', 'utf8');

        console.log(this.solve(input));
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
        let seconds = 0;
        while (true) {
            let local = JSON.parse(JSON.stringify(history[history.length - 1]));   // deep clone last array
            _.forEach(local, _ => {
                _.position.x += _.velocity.x;
                _.position.y += _.velocity.y;
            });

            boundingBox = this.getBoundingBox(local.map(_ => _.position));

            if (boundingBox.area > lastArea) break;

            lastArea = boundingBox.area;
            history.push(local);
            seconds++;
        }

        return seconds;
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