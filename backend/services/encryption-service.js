/*
    Encryption Service.
    This service is responsible for encrypting and decrypting text.
*/
var crypto    = require('crypto');
var algorithm = require('../../config').crypto.algorithm;
var secret    = require('../../config').crypto.secret;

var service = {};
service.encrypt = encrypt;
service.decrypt = decrypt;
module.exports = service;

function encrypt(text) {
  var cipher = crypto.createCipher(algorithm, secret);
  var crypted = cipher.update(text, 'utf8', 'hex');
  crypted += cipher.final('hex');
  return crypted || null;
}

function decrypt(text) {
  var decipher = crypto.createDecipher(algorithm, secret);
  var dec = decipher.update(text, 'hex', 'utf8');
  dec += decipher.final('utf8');
  return dec || null;
}
