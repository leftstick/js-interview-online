(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[1],{s5RK:function(n,a,e){"use strict";e.r(a),a["default"]=["const src = ['nan', 'feng', 'hao']\nconst target = ['aa', 'xiao', 'hao']\n\nassert.deepEqual(difference(src, target), ['nan', 'feng'], '\u57fa\u672c\u6d4b\u8bd5\u5931\u8d25')","const src = [1, NaN, 3]\nconst target = [NaN, 5, NaN]\n\nassert.deepEqual(difference(src, target), [1, 3], 'NaN\u5339\u914d\u6d4b\u8bd5\u5931\u8d25')","const src = [1, NaN, 3];\nconst target = [5, 'k'];\n\nassert.equal(difference(src, target).toString(), '1,NaN,3', 'NaN2\u5339\u914d\u6d4b\u8bd5\u5931\u8d25')"]}}]);