const fs = require('fs'),
    _ = require('lodash');

class Solution {
    constructor() {
        this.metadataSum = 0;
    }

    run() {
        const input = fs.readFileSync('./8.dat', 'utf8');
        // const input = '2 3 0 3 10 11 12 1 1 0 1 99 2 1 1 2';

        const result = this.solve(input);
        console.log('Result:', result);
    }

    solve(input) {
        let arr = _(input)
            .chain()
            .split(' ')
            .map(_ => +_)
            .value();

        let tree = this.readNextNode(arr);

        return this.metadataSum;
    }

    readNextNode(arr) {
        let childCount = arr.shift();
        let metadataCount = arr.shift();
        let metadata = [];
        let children = [];

        for (let i = 0; i < childCount; i++) {
            children.push(this.readNextNode(arr));
        }

        for (let i = 0; i < metadataCount; i++) {
            let entry = arr.shift();
            metadata.push(entry);

            this.metadataSum += entry;
        }

        return {
            header: {
                childCount,
                metadataCount
            },
            children,
            metadata
        };
    }
}

module.exports = Solution;