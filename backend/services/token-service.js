/*
    Token Service.
    This service is responsible for issuing and verifying jwt tokens.
*/
var jwt = require('jsonwebtoken');
var secret = require('../config').token.secret;

var service = {};
service.issue = issue;
service.verify = verify;
module.exports = service;

// Public Methods.
function issue(payload){
    return jwt.sign(payload, secret, { expiresIn: '60m' });
    
}

function verify(token) {
    return jwt.verify(token, secret);
}
