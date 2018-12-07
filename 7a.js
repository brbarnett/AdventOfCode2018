const fs = require('fs'),
    _ = require('lodash');

class Solution {
    run() {
        const input = fs.readFileSync('./7.dat', 'utf8');

        this.dependencies = _(input)
            .chain()
            .split('\n')
            .map(_ => this.parse(_))
            .value();

        this.steps = new Set();

        const result = this.solve();
        console.log('Result:', result);
    }

    solve() {
        const available = _.difference(_.uniq(this.dependencies.map(_ => _.dependency)), _.uniq(this.dependencies.map(_ => _.step)));

        do {
            const step = available.sort()[0];
            const hasAllDependencies = _(this.dependencies)
                .chain()
                .filter(_ => _.step === step)
                .every(_ => this.steps.has(_.dependency))
                .value();

            if (hasAllDependencies)
                this.steps.add(step);

            _.remove(available, _ => _ === step);

            available.push(...this.dependencies.filter(_ => _.dependency === step).map(_ => _.step));
        }
        while (available.length > 0)

        return [...this.steps].join('');
    }

    parse(instruction) {
        const parsed = instruction.match(/Step (\w) must be finished before step (\w) can begin/);
        return {
            step: parsed[2],
            dependency: parsed[1]
        };
    }
}

module.exports = Solution;