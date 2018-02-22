"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * p-single
 * change logs:
 * 2017/11/5 herbluo created
 */
var pSingle = exports.pSingle = function pSingle(fn) {
  var suspends = [];
  var isRunning = false;

  return function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return new Promise(function (resolve, reject) {
      var success = function success(val) {
        resolve(val);
        suspends.forEach(function (_ref) {
          var resolve = _ref.resolve;
          return resolve(val);
        });
        isRunning = false;
      };
      var fail = function fail(err) {
        reject(err);
        suspends.forEach(function (_ref2) {
          var reject = _ref2.reject;
          return reject(err);
        });
        isRunning = false;
      };

      if (!isRunning) {
        isRunning = true;
        fn.apply(undefined, args).then(success, fail);
      } else {
        suspends.push({ resolve: resolve, reject: reject });
      }
    });
  };
};

exports.default = pSingle;
var PSingle = exports.PSingle = function PSingle(thisBinding) {
  return function (target, property, descriptor) {
    descriptor.value = pSingle(descriptor.value.bind(thisBinding || target));
  };
};
