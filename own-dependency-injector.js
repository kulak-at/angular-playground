'use strict';

var kInjector = (function() {

  var FN_ARGS = /^function\s*[^\(]*\(\s*([^\)]*)\)/m;

  var injectDict = {};
  var noop = function() { };

  var getArguments = function(fn) {
    console.log(fn.toString());
    var args = fn.toString().match(FN_ARGS)[1].split(',');
    console.log(args);
    var argsR = [];
      for(var i in args) {
          var key = args[i];
          argsR.push(injectDict[key] || noop);
      }
      return argsR;
  };

  return {
    inject: function(key, value) {
      injectDict[key] = value;
    },
    call: function(fn) {
      var args = getArguments(fn);
      fn.apply(null, args);
    }
  };

})();


kInjector.inject('Test', function() {
  return 'X';
});


kInjector.call(function(Test) {
    Test() === 'X';
});