const _ = require('lodash');
const solution = new (require('./11b'))();

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