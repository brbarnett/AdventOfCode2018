const fs = require('fs'),
    _ = require('lodash');

class Solution {
    constructor() {
        this.recordExpression = /\[1518-(\d+)-(\d+) (\d+):(\d+)\] (.+)/;
        this.guard = null;
    }

    run() {
        const input = fs.readFileSync('./4.dat', 'utf8');

        const result = this.solve(input);
        console.log('Result:', result);
    }

    solve(input) {
        const guards = _(input)
            .chain()
            .split('\n')    // split by line break
            .map(x => this.parseRecord(x)) // parse into useful information
            .orderBy(x => x.chron)  // order chronologically
            .groupBy(x => x.mmdd)   // group by day
            .map(x => this.createDay(x))    // parse out midnight hour
            .groupBy(x => x.guard)
            .value();

        let guardTracker = [];
        for (let guard in guards) {
            let minutes = [];
            let max = 0;
            for (let min = 0; min < 60; min++) {
                let times = _.sumBy(guards[guard].map(x => x.day), x => x[min]);
                minutes.push(times);

                if (times > max) max = times;
            }

            guardTracker.push({
                maxMinute: _.findIndex(minutes, x => x === max),
                times: max,
                guard: +guard
            });
        }

        const maxGuard = _.maxBy(guardTracker, x => x.times);
        return maxGuard.guard * maxGuard.maxMinute;
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
            chron: parsed[1] + parsed[2] + parsed[3] + parsed[4],    // mmddhhmmm for ordering
            mmdd: parsed[1] + parsed[2]
        };
    }

    createDay(records) {
        let day = [];
        let asleep = false;
        let mmdd = null;
        let localGuard = this.guard;

        // loop through every minute, set state
        for (let min = 0; min < 60; min++) {
            const record = _.find(records, x => x.minute === min);

            // change state
            if (record) {
                if (mmdd === null) mmdd = record.mmdd;

                // change guard
                const guardIndex = record.log.indexOf('#');
                if (guardIndex >= 0) {
                    this.guard = record.log.split('#')[1].split(' ')[0];
                    if (record.hour === 0
                            || localGuard === null) localGuard = this.guard;
                    }

                // set awake
                if (record.log.indexOf('wakes up') >= 0) asleep = false;

                // set asleep
                if (record.log.indexOf('falls asleep') >= 0) asleep = true;
            }

            // log to day
            day.push(asleep);
        }

        return {
            mmdd: mmdd,
            guard: localGuard,
            day: day,
            asleepTime: _.countBy(day).true
        };
    }
}

module.exports = Solution;