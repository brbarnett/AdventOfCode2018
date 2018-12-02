const solution = new (require('./2b'))(),
    testHelpers = new (require('./test.helpers'))();

const assert = require('assert');

describe('2b', () => {
    testHelpers.registerUnitTest(`abcde
    fghij
    klmno
    pqrst
    fguij
    axcye
    wvxyz`, 'fgij', solution.solve.bind(solution));
});