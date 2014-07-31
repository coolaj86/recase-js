'use strict';

var recase = require('../recase').create({ exceptions: { FOO: 'foo'} })
  , orig
  , snake
  , camel
  ;

// handles camelCase, not CamelCase
orig = {
  FOO: 1                // Exception
, BAR: 1                // ALLCAPS
, abcXyz: {             // Normal
    _abcXyz: [          // private
      { __abcXyz: 1 }   // very private
    , { ___abcXyz: 1 }   // very very private
    ]
  }
};

snake = recase.snakeCopy(orig);
camel = recase.camelCopy(snake);

console.log(JSON.stringify(orig, null, '  '));
console.log(JSON.stringify(snake, null, '  '));
console.log(JSON.stringify(camel, null, '  '));
