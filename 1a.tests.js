const solution = new (require('./1a'))(),
    testHelpers = new (require('./test.helpers'))();

const assert = require('assert');

describe('1a', () => {
    testHelpers.registerUnitTest(`+1
    -2
    +3
    +1`, 3, solution.applyAdjustments);
    testHelpers.registerUnitTest(`+1
    +1
    +1`, 3, solution.applyAdjustments);
    testHelpers.registerUnitTest(`+1
    +1
    -2`, 0, solution.applyAdjustments);
    testHelpers.registerUnitTest(`-1
    -2
    -3`, -6, solution.applyAdjustments);
});