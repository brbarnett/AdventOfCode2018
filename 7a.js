const fs = require('fs'),
    _ = require('lodash');

class Solution {
    run() {
        const input = fs.readFileSync('./7.dat', 'utf8');

        const result = this.solve(input);
        console.log('Result:', result);
    }

    solve(input) {
        let steps = new Set();
        let dependencies = _(input)
            .chain()
            .split('\n')
            .map(_ => this.parse(_))
            .value();

        let available = _.difference(_.uniq(dependencies.map(_ => _.dependency)), _.uniq(dependencies.map(_ => _.step)));

        do {
            const step = available.sort()[0];
            const hasAllDependencies = _(dependencies)
                .chain()
                .filter(_ => _.step === step)
                .every(_ => steps.has(_.dependency))
                .value();

            if (hasAllDependencies)
                steps.add(step);

            _.remove(available, _ => _ === step);

            available.push(...dependencies.filter(_ => _.dependency === step).map(_ => _.step));
        }
        while (available.length > 0)

        return [...steps].join('');
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