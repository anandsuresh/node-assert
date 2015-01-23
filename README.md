# node-assert
Node-assert is the assertion framework that Node.JS is currently lacking. It augments the assert module by:

* Adding a set of helper functions to perform type checks
* Adding the ability to enable/disable assertions using the NODE_ASSERT environment variable


## usage

Set the NODE_ASSERT environment variable to "none", "warn" or "assert" to determine the level of assertion;
then run the node script as usual.


## api

The node-assert framework offers a very simple API to perform type checks. All assertion methods are of one of
the following forms:

* Basic assertions:
  * `isBoolean(argument, argumentName)`: Asserts that the argument is a boolean value
  * `isFunction(argument, argumentName)`: Asserts that the argument is a function
  * `isNumber(argument, argumentName)`: Asserts that the argument is a valid number (excludes Infinity)
  * `isObject(argument, argumentName)`: Asserts that the argument is an object
  * `isString(argument, argumentName)`: Asserts that the argument is a string
* Advanced assertions:
  * `isTypeOf(argument, type, argumentName)`: Asserts that the argument of the specified type
  * `isInstanceOf(argument, type, argumentName)`: Asserts that the argument an instance of the specified type

Based on the above set of assertions, more advanced assertion methods are available:
* `isOptional<Boolean|Function|Number|Object|String|TypeOf|InstanceOf>(argument, argumentName)`
* `isArrayOf<Boolean|Function|Number|Object|String|TypeOf|InstanceOf>(argument, argumentName)`
* `isOptionalArrayOf<Boolean|Function|Number|Object|String|TypeOf|InstanceOf>(argument, argumentName)`


## example
```javascript
// Determine if myObject is an object
assert.isObject(myObject, 'myArg');

// Determine if myString is undefined or a string
assert.isOptionalString(myString, 'myArg');

// Determine if myArrayOfErrors is an array, each of whose elements is an instance of Error
assert.isArrayOfInstanceOf(myArrayOfErrors, Error, 'myArg');
```

## inspiration

This library is inspired by the node-assert-plus library created by Mark Cavage which lacked the ability to
perform type/instance checks on arbitrary data types.


## license

The MIT License (MIT)

Copyright (c) 2015 Anand Suresh. All rights reserved.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
documentation files (the "Software"), to deal in the Software without restriction, including without
limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the
Software, and to permit persons to whom the Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions
of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED
TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF
CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
DEALINGS IN THE SOFTWARE.
