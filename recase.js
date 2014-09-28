/*jshint -W054 */
(function (exports) {
  'use strict';
  var _p
    ;

  function deepCopy(orig, recase) {
    var toReturn
      ;

    recase = recase || function (key) { return key; };

    if (Array.isArray(orig)) {
      toReturn = [];
      orig.forEach(function (val, i) {
        toReturn[i] = deepCopy(val, recase);
      });
      return toReturn;
    } else if (orig instanceof Date) {
      return new Date(orig);
    } else if (null !== orig && "object" === (typeof orig)) {
      toReturn = {};
      Object.keys(orig).forEach( function (key) {
        var rkey = recase(key)
          ;

        toReturn[rkey] = deepCopy(orig[key], recase);
      });
      return toReturn;
    } else {
      return orig;
    }
  }

  function Recase(opts) {
    opts = opts || opts;
    var me = this
      ;

    if (!(me instanceof Recase)) {
      return new Recase(opts);
    }

    //me._from = opts.from
    me._exceptions = opts.exceptions || { 'xml_http_request': 'XMLHttpRequest' };
    Object.keys(me._exceptions).forEach(function (k) {
      var v = me._exceptions[k]
        ;

      me._exceptions[v] = k;
    });

    me._snakifyBound = me.snakify.bind(this);
    me._camelizeBound = me.camelize.bind(this);
  }
  Recase.create = Recase.Recase = Recase;

  _p = Recase.prototype;

  // _abc -> _abc
  // abcXyz -> abc_xyz
  // $AbcXyz -> $abc_xyz // TODO
  _p.snakify = function(key) {
    // from camel to snake
    //var first_ = '_' === key[0] ? '_' : '';

    return this._exceptions[key]
      ||
      //(first_ + key.trim().replace(/(^|[a-z\d])([A-Z])/g, '$1_$2')/*.replace(/[-\s]+/g, '_')*/.toLowerCase())
      //(key.replace(/^_/,'**kirby**').replace(/([A-Z])/g, '_$1').replace('**kirby**', '_').toLowerCase())
      (key/*.replace(/^([A-Z])/g, '$$$1')*/.replace(/([A-Z])/g, '_$1').toLowerCase())
      ;
  };

  _p.camelize = function (key) {
    // from camel to snake
    return this._exceptions[key]
      ||
      //key.trim().replace(/[-_\s]+(.)?/g, function(match, c){ return c ? c.toUpperCase() : "_"; })
      //key.replace(/^_/,'**kirby**').replace(/_([^_])/g, function(match, c) {
      key.replace(/^(_+)/,'*$1*').replace(/_([a-z])/g, function(match, c) {
        if (c === c.toUpperCase()) {
          return c;
        }
        return c.toUpperCase();
      }).replace(/^\*(_+)\*/,'$1')
      ;
  };

  _p.snakeCopy = function (orig) {
    return deepCopy(orig, this._snakifyBound);
  };

  _p.camelCopy = function (orig) {
    return deepCopy(orig, this._camelizeBound);
  };

  exports.Recase = Recase;
  if ('undefined' !== typeof module) { module.exports = Recase; }
}('undefined' !== typeof exports && exports || 'undefined' !== typeof window && window || global));
