const fs = require('fs'),
    _ = require('lodash');

class Solution {
    run() {
        const input = '990941';

        const result = this.solve(input);
        console.log('Result:', result);
    }

    solve(input) {
        let scoreboard = [3, 7];
        let elf1 = 0
        let elf2 = 1;

        while (true) {
            let next = (scoreboard[elf1] + scoreboard[elf2]).toString().split('').map(x => +x);
            scoreboard.push(...next);

            // optimize by grabbing right 10 instead of entire string every time
            if(_.takeRight(scoreboard, 10).join('').toString().indexOf(input) >= 0) {
                return scoreboard.join('').toString().indexOf(input);
            }

            elf1 += moveElf(elf1);
            elf2 += moveElf(elf2);
        }

        function moveElf(position) {
            let moves = scoreboard[position] + 1;
            moves = moves % scoreboard.length;
            if (position + moves >= scoreboard.length)
                moves -= scoreboard.length;
            return moves;
        }
    }
}

module.exports = Solution;