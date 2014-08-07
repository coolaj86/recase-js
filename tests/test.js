/*jshint -W054 */
(function (exports) {
  'use strict';

  var Recase = exports.Recase || require('../recase')
    , recase = Recase.create({ exceptions: { FOO: 'foo'} })
    , assert = require('assert')
    , snake
    , camel
    , _ = exports._ || require('lodash')
    , d = new Date()
    ;

  snake = recase.snakeCopy({
    FOO: 1                // Exception
  , abcXyz: {             // Normal
      _abcXyz: [          // private
        { __abcXyz: 1 }   // very private
      , { ___abcXyz: 1 }   // very very private
      ]
    }
  , date: d
  });

  camel = recase.camelCopy({
    foo: 1                // Exception
  , abc_xyz: {             // Normal
      _abc_xyz: [          // private
        { __abc_xyz: 1 }   // very private
      , { ___abc_xyz: 1 }   // very very private
      ]
    }
  , date: d
  });

  assert.ok(_.isEqual(recase.camelCopy(snake), camel));
  assert.ok(_.isEqual(recase.snakeCopy(camel), snake));
  console.info('PASS');
}('undefined' !== typeof exports && exports || new Function('return this')()));
