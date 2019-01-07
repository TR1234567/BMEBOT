const express = require('express');
var hex = require('./get')

console.log('Starting function');
module.exports = function (app, db) {
    var module = {};
    module.auth = function hexToSignedInt(req, res) {
        if (hex.length % 2 != 0) {
            hex = "0" + hex;
        }
        var num = parseInt(hex, 16);
        var maxVal = Math.pow(2, hex.length / 2 * 8);
        if (num > maxVal / 2 - 1) {
            num = num - maxVal
        }
        return num;
    }
    console.log(num);
    module.exports = {num};
  };


  