(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[5],{"7zuc":function(n,t,a){"use strict";a.r(t),t["default"]=["const NativeMap = Array.prototype.map\n  let calledNativeMap = false\nArray.prototype.map = function() {\n  calledNativeMap = true\n  return NativeMap.apply(this, arguments)\n}\n\nmap(['x'], function(x) {\n  return x;\n})\nassert.equal(calledNativeMap, false, '\u4e0d\u80fd\u4f7f\u7528\u539f\u751f\u7684map\u65b9\u6cd5')\n","const test = [1, 2, 3]\nconst actual = map(test, function(i) {\n    return i + 1\n})\nassert.deepEqual(actual, [2, 3, 4], '\u57fa\u672c\u6d4b\u8bd5\u7528\u4f8b\u5931\u8d25')","const test = [\n  {\n      city: 'Shanghai',\n      population: 25000000\n  },\n  {\n      city: 'Beijing',\n      population: 30000000\n  }\n];\nconst actual = map(test, function(i) {\n  return i.population / this\n}, 10)\nassert.deepEqual(actual, [2500000, 3000000], '\u4e0a\u4e0b\u6587\u73af\u5883\u6d4b\u8bd5\u5931\u8d25')"]}}]);