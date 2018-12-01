const assert = require('assert');

class Helpers {
    registerUnitTest(input, expected, evaluator) {
        return it(`should return ${expected} when value is '${input}'`, () => assert.equal(evaluator(input), expected));
    }
}

module.exports = Helpers;