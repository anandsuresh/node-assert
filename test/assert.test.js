/**
 * @file Unit tests for the node-assert framework
 *
 * @author Anand Suresh <anandsuresh@gmail.com>
 * @copyright Copyright (C) 2015 Anand Suresh. All rights reserved.
 */

var path = require('path');
var expect = require('chai').expect;



describe('Assert', function() {
    before(function() {
        delete require.cache[path.resolve('../assert.js')];
    });


    describe('For level ASSERT', function() {
        process.env.NODE_ASSERT = 'assert';
        var assert = require('../assert');


        describe('.isBoolean', function() {
            it('should throw an error if the argument isn\'t a boolean value', function() {
                expect(function() { assert.isBoolean(); }).to.throw(Error);
                expect(function() { assert.isBoolean(null); }).to.throw(Error);
                expect(function() { assert.isBoolean(function() {}); }).to.throw(Error);
                expect(function() { assert.isBoolean(42); }).to.throw(Error);
                expect(function() { assert.isBoolean({}); }).to.throw(Error);
                expect(function() { assert.isBoolean(''); }).to.throw(Error);
                expect(function() { assert.isBoolean('string'); }).to.throw(Error);
            });

            it('should NOT throw an error if the argument is a boolean value', function() {
                expect(function() { assert.isBoolean(true); }).to.not.throw(Error);
                expect(function() { assert.isBoolean(false); }).to.not.throw(Error);
            });
        });


        describe('.isFunction', function() {
            it('should throw an error if the argument isn\'t a function', function() {
                expect(function() { assert.isFunction(); }).to.throw(Error);
                expect(function() { assert.isFunction(null); }).to.throw(Error);
                expect(function() { assert.isFunction(true); }).to.throw(Error);
                expect(function() { assert.isFunction(false); }).to.throw(Error);
                expect(function() { assert.isFunction(42); }).to.throw(Error);
                expect(function() { assert.isFunction({}); }).to.throw(Error);
                expect(function() { assert.isFunction(''); }).to.throw(Error);
                expect(function() { assert.isFunction('string'); }).to.throw(Error);
            });

            it('should NOT throw an error if the argument is a function', function() {
                expect(function() { assert.isFunction(function() {}); }).to.not.throw(Error);
            });
        });


        describe('.isNumber', function() {
            it('should throw an error if the argument isn\'t a number', function() {
                expect(function() { assert.isNumber(); }).to.throw(Error);
                expect(function() { assert.isNumber(null); }).to.throw(Error);
                expect(function() { assert.isNumber(true); }).to.throw(Error);
                expect(function() { assert.isNumber(false); }).to.throw(Error);
                expect(function() { assert.isNumber(function() {}); }).to.throw(Error);
                expect(function() { assert.isNumber({}); }).to.throw(Error);
                expect(function() { assert.isNumber(''); }).to.throw(Error);
                expect(function() { assert.isNumber('string'); }).to.throw(Error);
            });

            it('should NOT throw an error if the argument is a number', function() {
                expect(function() { assert.isNumber(42); }).to.not.throw(Error);
            });
        });


        describe('.isObject', function() {
            it('should throw an error if the argument isn\'t an object', function() {
                expect(function() { assert.isObject(); }).to.throw(Error);
                expect(function() { assert.isObject(null); }).to.throw(Error);
                expect(function() { assert.isObject(true); }).to.throw(Error);
                expect(function() { assert.isObject(false); }).to.throw(Error);
                expect(function() { assert.isObject(function() {}); }).to.throw(Error);
                expect(function() { assert.isObject(42); }).to.throw(Error);
                expect(function() { assert.isObject(''); }).to.throw(Error);
                expect(function() { assert.isObject('string'); }).to.throw(Error);
            });

            it('should NOT throw an error if the argument is an object', function() {
                expect(function() { assert.isObject({}); }).to.not.throw(Error);
            });
        });


        describe('.isString', function() {
            it('should throw an error if the argument isn\'t an string', function() {
                expect(function() { assert.isString(); }).to.throw(Error);
                expect(function() { assert.isString(null); }).to.throw(Error);
                expect(function() { assert.isString(true); }).to.throw(Error);
                expect(function() { assert.isString(false); }).to.throw(Error);
                expect(function() { assert.isString(function() {}); }).to.throw(Error);
                expect(function() { assert.isString(42); }).to.throw(Error);
                expect(function() { assert.isString({}); }).to.throw(Error);
            });

            it('should NOT throw an error if the argument is a string', function() {
                expect(function() { assert.isString(''); }).to.not.throw(Error);
                expect(function() { assert.isString('string'); }).to.not.throw(Error);
            });
        });


        describe('.isTypeOf', function() {
            it('should NOT throw an error if the argument is of the specified type', function() {
                expect(function() { assert.isTypeOf(undefined, 'undefined'); }).to.not.throw(Error);
                expect(function() { assert.isTypeOf(null, 'object'); }).to.not.throw(Error);
                expect(function() { assert.isTypeOf(true, 'boolean'); }).to.not.throw(Error);
                expect(function() { assert.isTypeOf(false, 'boolean'); }).to.not.throw(Error);
                expect(function() { assert.isTypeOf(function() {}, 'function'); }).to.not.throw(Error);
                expect(function() { assert.isTypeOf(42, 'number'); }).to.not.throw(Error);
                expect(function() { assert.isTypeOf({}, 'object'); }).to.not.throw(Error);
            });
        });


        describe('.isInstanceOf', function() {
            it('should NOT throw an error if the argument isn\'t an object', function() {
                expect(function() { assert.isInstanceOf(new Error(), Error); }).to.not.throw(Error);
            });
        });
    });
});
