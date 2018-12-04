const fs = require('fs'),
    _ = require('lodash');

class Solution {
    constructor() {
        this.recordExpression = /\[1518-(\d+)-(\d+) (\d+):(\d+)\] (.+)/;
    }

    run() {
        // const input = fs.readFileSync('./3.dat', 'utf8');
        const input = `[1518-11-01 00:00] Guard #10 begins shift
        [1518-11-01 00:05] falls asleep
        [1518-11-01 00:25] wakes up
        [1518-11-01 00:30] falls asleep
        [1518-11-01 00:55] wakes up
        [1518-11-01 23:58] Guard #99 begins shift
        [1518-11-02 00:40] falls asleep
        [1518-11-02 00:50] wakes up
        [1518-11-03 00:05] Guard #10 begins shift
        [1518-11-03 00:24] falls asleep
        [1518-11-03 00:29] wakes up
        [1518-11-04 00:02] Guard #99 begins shift
        [1518-11-04 00:36] falls asleep
        [1518-11-04 00:46] wakes up
        [1518-11-05 00:03] Guard #99 begins shift
        [1518-11-05 00:45] falls asleep
        [1518-11-05 00:55] wakes up`;

        const result = this.solve(input);
        console.log('Result:', result);
    }

    solve(input) {
        const arr = _(input)
            .chain()
            .split('\n')    // split by line break
            .map(x => this.parseRecord(x)) // parse into useful information
            .orderBy(x => x.chron)  // order chronologically
            .value();
    }

    parseRecord(record) {
        const parsed = record.match(this.recordExpression);

        return {
            raw: parsed[0],
            month: +parsed[1],
            day: +parsed[2],
            hour: +parsed[3],
            minute: +parsed[4],
            log: parsed[5],
            chron: parsed[1] + parsed[2] + parsed[3] + parsed[4]    // mmddhhmmm for ordering
        };
    }
}

module.exports = Solution;