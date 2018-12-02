const solution = new (require('./2a'))(),
    testHelpers = new (require('./test.helpers'))();

const assert = require('assert');

describe('2a', () => {
    testHelpers.registerUnitTest('abcdef', { two: 0, three: 0 }, solution.solve.bind(solution));
    testHelpers.registerUnitTest('bababc', { two: 0, three: 0 }, solution.solve.bind(solution));
    testHelpers.registerUnitTest('abbcde', { two: 0, three: 0 }, solution.solve.bind(solution));
    testHelpers.registerUnitTest('abcccd', { two: 0, three: 0 }, solution.solve.bind(solution));
    testHelpers.registerUnitTest('aabcdd', { two: 0, three: 0 }, solution.solve.bind(solution));
    testHelpers.registerUnitTest('abcdee', { two: 0, three: 0 }, solution.solve.bind(solution));
    testHelpers.registerUnitTest('ababab', { two: 0, three: 0 }, solution.solve.bind(solution));
});