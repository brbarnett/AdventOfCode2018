const _ = require('lodash');
const solution = new (require('./13b'))();

// custom lodash functions
(function() {
    _.mixin({
        'debug': function (val) {
            console.log(val);
            return val;
        }
    });
}());

solution.run();