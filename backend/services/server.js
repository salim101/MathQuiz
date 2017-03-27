var fs = require("fs");
var express = require('express');
var EncryptionService = require('./api/services/encryption-service.js');
var TokenService = require('./api/services/token-service.js');
var AuthenticationService = require('./api/services/authentication-service.js');
var app = express();


app.use(AuthenticationService.intercept);


app.post('/encrypt', function(req, res){
  req.on('data', function(data) {
    var text = JSON.parse(data.toString()).text;
    text = EncryptionService.encrypt(text);
    res.json( { encrypted: text } );
  });
});

app.post('/request-token', function(req, res){
  req.on('data', function(data) {
    var user   = JSON.parse(data.toString()).user,
        token  = TokenService.issue(user),
        jwt    = { user: user, token: token };
    res.json( jwt );
  });
});

/*
app.post('/decrypt-password', function(req, res){
  req.on('data', function(data) {
    var user = JSON.parse(data.toString()).user;
    user.password = EncryptionService.decrypt(user.password);
    res.json( { user: user } );
  });
});
*/


app.use(express.static('../frontend'));
var server = app.listen(8081, '0.0.0.0', function (req, res) {
  var host = server.address().address,
      port = server.address().port;
  console.log("Listening at http://%s:%s", host, port);
});
