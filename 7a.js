const fs = require('fs'),
    _ = require('lodash');

class Solution {
    run() {
        const input = fs.readFileSync('./7.dat', 'utf8');
        // const input = `Step C must be finished before step A can begin.
        // Step C must be finished before step F can begin.
        // Step A must be finished before step B can begin.
        // Step A must be finished before step D can begin.
        // Step B must be finished before step E can begin.
        // Step D must be finished before step E can begin.
        // Step F must be finished before step E can begin.`;

        this.dependencies = _(input)
            .chain()
            .split('\n')
            .map(_ => this.parse(_))
            .value();

        this.steps = [];

        const result = this.solve();
        console.log('Result:', result);
    }

    solve() {
        const start = _.difference(_.uniq(this.dependencies.map(_ => _.dependency)), _.uniq(this.dependencies.map(_ => _.step))).sort();

        this.findNextSteps(start[0], 0);

        const steps = this.steps.map(_ => _.step);
        const last = steps.reverse()[0];
        _.remove(steps, _ => _ === last);
        steps.reverse().push(last);

        return _.uniq(steps).join('');
    }

    parse(instruction) {
        const parsed = instruction.match(/Step (\w) must be finished before step (\w) can begin/);
        return {
            step: parsed[2],
            dependency: parsed[1]
        };
    }

    findNextSteps(step, level) {
        this.steps.push({
            step: step,
            level: level
        });

        const nextSteps = this.dependencies.filter(_ => _.dependency === step).map(_ => _.step).sort();

        nextSteps.forEach(_ => this.findNextSteps(_, level + 1));
    }
}

module.exports = Solution;