const solution = new (require('./1b'))(),
    testHelpers = new (require('./test.helpers'))();

const assert = require('assert');

describe('1b', () => {
    testHelpers.registerUnitTest(`+1
    -2
    +3
    +1`, 2, solution.applyAdjustments);
    testHelpers.registerUnitTest(`+1
    -1`, 0, solution.applyAdjustments);
    testHelpers.registerUnitTest(`+3
    +3
    +4
    -2
    -4`, 10, solution.applyAdjustments);
    testHelpers.registerUnitTest(`-6
    +3
    +8
    +5
    -6`, 5, solution.applyAdjustments);
    testHelpers.registerUnitTest(`+7
    +7
    -2
    -7
    -4`, 14, solution.applyAdjustments);
});