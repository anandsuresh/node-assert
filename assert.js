/**
 * @file An augmented assertion framework for node.js
 *
 * @author Anand Suresh <anandsuresh@gmail.com>
 * @copyright Copyright (C) 2015 Anand Suresh. All rights reserved.
 */

var assert = require('assert');
var format = require('util').format;



var basicTypeAssertions = {
    isBoolean : function(arg) { return typeof arg === 'boolean'; },
    isFunction: function(arg) { return typeof arg === 'function'; },
    isNumber  : function(arg) { return typeof arg === 'number' && !isNaN(arg) && isFinite(arg); },
    isObject  : function(arg) { return typeof arg === 'object' && arg !== null; },
    isString  : function(arg) { return typeof arg === 'string'; }
};


var advancedTypeAssertions = {
    isTypeOf    : function(arg, type) { return (typeof arg === type); },
    isInstanceOf: function(arg, type) { return (arg instanceof type); }
};



var Assert = module.exports;


Assert.ASSERTION_LEVELS = {
    NONE  : {
        level: 'none',
        fn   : function() {}
    },
    WARN  : {
        level: 'warn',
        fn   : function(options) {
            console.warn(JSON.stringify({
                op   : 'assertionError',
                msg  : options.message,
                stack: options.startStackFunction
            }));
        }
    },
    ASSERT: {
        level: 'assert',
        fn   : function(options) {
            throw new assert.AssertionError({
                message           : options.message,
                expected          : options.expected,
                actual            : options.actual,
                operator          : options.operator,
                startStackFunction: options.startStackFunction
            });
        }
    }
};


Assert.assertFn = (function(assertLevel) {
    switch (assertLevel) {
    case Assert.ASSERTION_LEVELS.ASSERT.level:
        Assert.assertionEnabled = true;
        return Assert.ASSERTION_LEVELS.ASSERT.fn;

    case Assert.ASSERTION_LEVELS.WARN.level:
        Assert.assertionEnabled = true;
        return Assert.ASSERTION_LEVELS.WARN.fn;

    default:
        Assert.assertionEnabled = false;
        return Assert.ASSERTION_LEVELS.NONE.fn;
    }
})(process.env['NODE_ASSERT']);



// Export assertion functions for each type, optional arguments, arrays and optional arrays.
Object.keys(basicTypeAssertions).forEach(function(k) {
    var assertType = basicTypeAssertions[k],
        fnSuffix = k.slice(2),
        type = fnSuffix.toLowerCase();


    Assert['is' + fnSuffix] = function(arg, name) {
        if (!Assert.assertionEnabled) return;
        if (!assertType(arg)) {
            var msg = format('%s should be of type %s but is of type %s. (' + arg + ')', name, type, typeof(arg));
            Assert.assertFn({
                message           : msg,
                expected          : type,
                actual            : typeof(arg),
                operator          : 'typeof',
                startStackFunction: 'is' + fnSuffix
            });
        }
    };


    Assert['isOptional' + fnSuffix] = function(arg, name) {
        if (!Assert.assertionEnabled) return;
        if (arg !== undefined) Assert['is' + fnSuffix](arg, name);
    };


    Assert['isArrayOf' + fnSuffix] = function(arg, name) {
        if (!Assert.assertionEnabled) return;

        var msg;
        if (!Array.isArray(arg)) {
            msg = format('%s should be an array but is of type %s. (' + arg + ')', name, typeof(arg));
            Assert.assertFn({
                message           : msg,
                expected          : 'array',
                actual            : typeof(arg),
                operator          : 'typeof',
                startStackFunction: 'isArrayOf' + fnSuffix
            });
        }

        for (var i = 0; i < arg.length; i++) {
            if (!assertType(arg[i])) {
                msg = format('Index %d in array %s should be a %s but is a %s. (' + arg + ')', i, name, type, typeof(arg));
                Assert.assertFn({
                    message           : msg,
                    expected          : type,
                    actual            : typeof(arg),
                    operator          : 'typeof',
                    startStackFunction: 'isArrayOf' + fnSuffix
                });
            }
        }
    };


    Assert['isOptionalArrayOf' + fnSuffix] = function(arg, name) {
        if (!Assert.assertionEnabled) return;
        if (arg !== undefined) Assert['isArrayOf' + fnSuffix](arg, name);
    };
});



// Export assertion functions for each type, optional arguments, arrays and optional arrays.
Object.keys(advancedTypeAssertions).forEach(function(k) {
    var assertType = advancedTypeAssertions[k],
        fnSuffix = k.slice(2);


    Assert['is' + fnSuffix] = function(arg, type, name) {
        if (!Assert.assertionEnabled) return;
        if (!assertType(arg, type)) {
            var msg = format('%s should be of type %s but is of type %s. (' + arg + ')', name, type, typeof(arg));
            Assert.assertFn({
                message           : msg,
                expected          : type,
                actual            : typeof(arg),
                operator          : 'typeof',
                startStackFunction: 'is' + fnSuffix
            });
        }
    };


    Assert['isOptional' + fnSuffix] = function(arg, type, name) {
        if (!Assert.assertionEnabled) return;
        if (arg !== undefined) Assert['is' + fnSuffix](arg, type, name);
    };


    Assert['isArrayOf' + fnSuffix] = function(arg, type, name) {
        if (!Assert.assertionEnabled) return;

        var msg;
        if (!Array.isArray(arg)) {
            msg = format('%s should be an array but is of type %s. (' + arg + ')', name, typeof(arg));
            Assert.assertFn({
                message           : msg,
                expected          : 'array',
                actual            : typeof(arg),
                operator          : 'typeof',
                startStackFunction: 'isArrayOf' + fnSuffix
            });
        }

        for (var i = 0; i < arg.length; i++) {
            if (!assertType(arg[i], type)) {
                msg = format('Index %d in array %s should be a %s but is a %s. (' + arg + ')', i, name, type, typeof(arg));
                Assert.assertFn({
                    message           : msg,
                    expected          : type,
                    actual            : typeof(arg),
                    operator          : 'typeof',
                    startStackFunction: 'isArrayOf' + fnSuffix
                });
            }
        }
    };


    Assert['isOptionalArrayOf' + fnSuffix] = function(arg, type, name) {
        if (!Assert.assertionEnabled) return;
        if (arg !== undefined) Assert['isArrayOf' + fnSuffix](arg, type, name);
    };
});



// Re-export the built-in functions in the assert library
Object.keys(assert).forEach(function(func) {
    if (func === 'AssertionError') {
        Assert[func] = assert[func];
        return;
    }

    Assert[func] = function() {
        if (!Assert.assertionEnabled) return;
        assert[func].apply(assert[func], arguments);
    };
});
