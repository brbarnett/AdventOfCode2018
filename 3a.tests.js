const solution = new (require('./3a'))(),
    testHelpers = new (require('./test.helpers'))();

const assert = require('assert');

describe('3a', () => {
    testHelpers.registerUnitTest(`#1 @ 1,3: 4x4
    #2 @ 3,1: 4x4
    #3 @ 5,5: 2x2`, 4, solution.solve.bind(solution));
});