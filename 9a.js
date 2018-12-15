const fs = require('fs'),
    _ = require('lodash');

class Solution {
    run() {
        const input = { players: 468, lastMarble: 71010 };

        const result = this.solve(input);
        console.log('Result:', result);
    }

    solve(input) {
        // build player list
        let players = [];
        for (let i = 1; i <= input.players; i++) {
            players.push({
                number: i,
                marbles: []
            });
        }

        let circle = [0];

        // set up first few moves
        circle.push(...[2, 1]);
        players.push(...players.splice(0, 2));

        for (let i = 3; i <= input.lastMarble; i++) {
            let player = players.shift();   // get first player

            if (i % 23 === 0) {
                player.marbles.push(i);
                player.marbles.push(circle.splice(circle.length - 9, 1)[0]);

                // shift circle
                circle.unshift(...circle.splice(circle.length - 6, 6));
            }
            else {
                circle.push(i);

                circle.push(...circle.splice(0, 1));    // shift circle to position (current) at index length - 2
            }

            players.push(player);   // back in line
        }

        let maxScore = _(players)
            .chain()
            .map(x => _.sum(x.marbles))
            .max()
            .value();

        return maxScore;
    }
}

module.exports = Solution;