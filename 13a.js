const fs = require('fs'),
    _ = require('lodash');

class Solution {
    run() {
        const input = fs.readFileSync('./13.dat', 'utf8');

        const result = this.solve(input);
        console.log('Result:', result);
    }

    solve(input) {
        let lines = _(input)
            .chain()
            .split('\r\n')
            .value()

        let carts = [];
        for (let y = 0; y < lines.length; y++) {
            searchForCart(lines[y], y, '^');
            searchForCart(lines[y], y, '>');
            searchForCart(lines[y], y, 'v');
            searchForCart(lines[y], y, '<');

            lines[y] = lines[y].replace(/[\^v]/, '|');
            lines[y] = lines[y].replace(/[<>]/, '-');
        }

        let grid = _(lines)
            .chain()
            .map(x => x.split(''))
            .value();

        let moves = 0;
        while (true) {
            moves++;
            carts = _.sortBy(carts, ['y', 'x']);

            for (let i = 0; i < carts.length; i++) {
                let cart = carts[i];

                // move cart
                if (cart.direction === '^') cart.y--;
                if (cart.direction === '>') cart.x++;
                if (cart.direction === 'v') cart.y++;
                if (cart.direction === '<') cart.x--;

                if (_.filter(carts, x => x.x === cart.x && x.y === cart.y).length > 1)
                    return cart;

                // change direction
                let segment = grid[cart.y][cart.x];

                // if | or -, do nothing

                if (segment === '\\' && cart.direction === '^') {
                    cart.direction = '<';
                    continue;
                }
                if (segment === '\\' && cart.direction === '>') {
                    cart.direction = 'v';
                    continue;
                }
                if (segment === '\\' && cart.direction === 'v') {
                    cart.direction = '>';
                    continue;
                }
                if (segment === '\\' && cart.direction === '<') {
                    cart.direction = '^';
                    continue;
                }

                if (segment === '/' && cart.direction === '^') {
                    cart.direction = '>';
                    continue;
                }
                if (segment === '/' && cart.direction === '>') {
                    cart.direction = '^';
                    continue;
                }
                if (segment === '/' && cart.direction === 'v') {
                    cart.direction = '<';
                    continue;
                }
                if (segment === '/' && cart.direction === '<') {
                    cart.direction = 'v';
                    continue;
                }

                if (segment === '+' && cart.nextTurn === 'L') {
                    cart.direction = turnCart(cart.direction, 'L');
                    cart.nextTurn = 'S';
                    continue;
                }

                if (segment === '+' && cart.nextTurn === 'S') {
                    cart.direction = turnCart(cart.direction, 'S');
                    cart.nextTurn = 'R';
                    continue;
                }

                if (segment === '+' && cart.nextTurn === 'R') {
                    cart.direction = turnCart(cart.direction, 'R');
                    cart.nextTurn = 'L';
                    continue;
                }
            }
        }

        function searchForCart(line, y, direction) {
            let index = line.indexOf(direction);
            while (index >= 0) {
                carts.push({
                    x: index,
                    y,
                    direction,
                    nextTurn: 'L'
                });

                index = line.indexOf(direction + 1);
            }
        }

        function turnCart(direction, turn) {
            if (turn === 'S') return direction;

            if (direction === '^' && turn === 'L') return '<';
            if (direction === '^' && turn === 'R') return '>';

            if (direction === '>' && turn === 'L') return '^';
            if (direction === '>' && turn === 'R') return 'v';

            if (direction === 'v' && turn === 'L') return '>';
            if (direction === 'v' && turn === 'R') return '<';

            if (direction === '<' && turn === 'L') return 'v';
            if (direction === '<' && turn === 'R') return '^';

            throw 'Incorrect input';
        }
    }
}

module.exports = Solution;