recase
======

Deep re-key Objects and Arrays as either camel case or snake case.

In short:

```json
{ "fooBar": [
    { "baz": 1 }
  , { "_quxQuuxCorgeGrault": { "garplyWaldoFred": "plughXyzzyThud" } }
  ]
}
```

becomes:

```json
{ "foo_bar": [
    { "baz": 1 }
  , { "_qux_quux_corge_grault": { "garply_waldo_fred": "plughXyzzyThud" } }
  ]
}
```

And can be converted back.

Note that leading underscores `_` are considered as convention for private / special vars and are ingnored when changing case.

If I ever support `CamelCaps` (first letter capital) I might use leading `$` for private / special.

Usage
=====

This example works in both the Browser and Node

```javascript
(function (exports) {
  'use strict';

  var Recase = exports.Recase || require('recase')
    , recase = Recase.create({ exceptions: { FOO: 'foo'} })
    , snake
    , camel
    , _ = exports._ || require('lodash')
    ;

  snake = recase.snakeCopy(
    {
      FOO: 1                // Exception
    , abcXyz: {             // Normal
        _abcXyz: [          // private
          { __abcXyz: 1 }   // very private
        , { ___abcXyz: 1 }   // very very private
        ]
      }
    }
  );

  camel = recase.camelCopy(
    {
      foo: 1                // Exception
    , abc_xyz: {             // Normal
        _abc_xyz: [          // private
          { __abc_xyz: 1 }   // very private
        , { ___abc_xyz: 1 }   // very very private
        ]
      }
    }
  );

  console.log(_.isEqual(recase.camelCopy(snake), camel));
  console.log(_.isEqual(recase.snakeCopy(camel), snake));
}('undefined' !== typeof exports && exports || new Function('return this')()));
```

Currently converts between the two most common conventions (that I've seen):

* `snake_case -> camelCase` and `_private_var -> _privateVar`
* `camelCase -> snake_case` and `_privateVar -> _private_var`

Install
=======

`npm install --save recase`

`bower install --save recase`

Notes
-----

Does not support `CamelCaps`

Use the exceptions map for inconsistent key conversions such as `XMLHttpRequest` -> `xml_http_request`.
