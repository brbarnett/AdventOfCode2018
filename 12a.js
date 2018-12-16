const fs = require('fs'),
    _ = require('lodash');

class Solution {
    run() {
        const input = {
            initial: '###....#..#..#......####.#..##..#..###......##.##..#...#.##.###.##.###.....#.###..#.#.##.#..#.#',
            notes: `..### => #
            ..... => .
            ..#.. => .
            .###. => .
            ...## => #
            #.### => .
            #.#.# => #
            ##..# => .
            ##.## => #
            #...# => .
            ..##. => .
            ##.#. => .
            ...#. => .
            #..#. => #
            .#### => #
            .#..# => #
            ##... => #
            .##.# => .
            ....# => .
            #.... => .
            .#.#. => #
            .##.. => .
            ###.# => #
            ####. => .
            ##### => #
            #.##. => #
            .#... => #
            .#.## => #
            ###.. => #
            #..## => .
            #.#.. => #
            ..#.# => .`
        };

        const result = this.solve(input);
        console.log('Result:', result);
    }

    solve(input) {
        let initial = _.pad(input.initial, input.initial.length * 3, '.');  // pad initial
        let notes = _(input.notes)
            .chain()
            .split('\n')
            .map(_ => _.trim())
            .map(_ => {
                let parts = _.split(' => ');
                return {
                    pattern: parts[0],
                    result: parts[1]
                }
            })
            .value()

        const generationCount = 20;
        let generations = [initial];
        let lastGeneration = [];
        for (let i = 1; i <= generationCount; i++) {
            let generation = _.last(generations);
            let nextGeneration = _.fill(new Array(generation.length), '.').join('');
            _.forEach(notes, x => {
                let index = generation.indexOf(x.pattern, 0);
                while (index >= 0) {
                    if(i === generationCount && x.result === '#') {
                        lastGeneration.push(index - generation.length / 3 + 2);
                    }

                    nextGeneration = nextGeneration.substr(0, index + 2) + x.result + nextGeneration.substr(index + 3, nextGeneration.length - index + 3);

                    index = generation.indexOf(x.pattern, index + 1);
                }
            })
            generations.push(nextGeneration);
        }

        return _.sum(lastGeneration);
    }
}

module.exports = Solution;