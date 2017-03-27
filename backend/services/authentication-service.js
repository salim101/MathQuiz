/*
    Authentication Service.
    This service is responsible for intercepting the clients request
    and if an authentication token is required for a restricted page
    it uses the TokenService to verify the token.
*/

//UnauthorisedRequestInterceptorService

var TokenService = require('./token-service.js');

var service = {};
service.intercept = intercept;
module.exports = service;

// Public methods.

function intercept(req, res, next) {

    //console.log(req.originalUrl + ' : ' + _isPrivatePage(req.originalUrl));
    
    console.log(req.originalUrl);
    //console.log(req.headers.authorization);


    // The client is requesting a private page.
    if (_isPrivatePage(req.originalUrl)) {
        
        console.log(req.originalUrl);

        // No Authorization Header.
        if (!_requestHasAuthorizationHeader(req))
            return res.status(401).json({
                err: 'No Authorization header was found'
            });
        
        // Authorization Header present, continue...
        
        // The token is in the wrong format?
        var token = _tokenFromRequest(req);
        if (!token)
            return res.status(401).json({
                err: 'Format is Authorization: Bearer [token]'
            });
        
        // The token is in the correct format, continue...
        
        // Is the token valid?
        try {
            var decoded = TokenService.verify(token);
            console.log(decoded);
        } catch (err) {
            return res.status(401).json({
                err: 'Authorization header is invalid'
            });
        }        
        
    }
    next();
}

// Private methods.
function _isPrivatePage(url) {
    var privatePages = ['/api/teacher/*/*'];
    return privatePages.indexOf(url) >= 0 ? true : false;
}

function _requestHasAuthorizationHeader(req) {
    return (req.headers && req.headers.authorization);
}

function _tokenFromRequest(req) {
    var parts = req.headers.authorization.split(' ');
    if (parts.length == 2) {
        var scheme      = parts[0],
            credentials = parts[1];
        if (/^Bearer$/i.test(scheme))
            return credentials;
    }
    return null;
}