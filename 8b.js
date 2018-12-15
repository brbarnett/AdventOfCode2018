const fs = require('fs'),
    _ = require('lodash');

class Solution {
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

        let root = this.readNextNode(arr);

        return root.value;
    }

    readNextNode(arr) {
        let childCount = arr.shift();
        let metadataCount = arr.shift();
        let metadata = [];
        let children = [];
        let value = 0;

        for (let i = 0; i < childCount; i++) {
            children.push(this.readNextNode(arr));
        }

        for (let i = 0; i < metadataCount; i++) {
            let entry = arr.shift();
            metadata.push(entry);
        }

        if (children.length === 0) {
            value = _.sum(metadata);
        }
        else {
            for (let i = 0; i < metadata.length; i++) {
                let entry = metadata[i] - 1;    // shift by one to account for one index
                if (entry < 0 || entry >= children.length) continue;  // account for OOB indices

                value += children[entry].value;
            }
        }

        return {
            header: {
                childCount,
                metadataCount
            },
            children,
            metadata,
            value
        };
    }
}

module.exports = Solution;