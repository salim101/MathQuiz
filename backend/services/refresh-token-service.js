/*
    Refresh Token Service.
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
    if (_isPrivatePage(req.originalUrl)) {
        if (!_requestHasAuthorizationHeader(req))
            return res.status(401).json({
                err: 'No Authorization header was found'
            });
        var token = _tokenFromRequest(req);
        if (!token)
            return res.status(401).json({
                err: 'Format is Authorization: Bearer [token]'
            });
        
        
        
        try {
            var decoded = TokenService.verify(token);
            console.log(decoded);
        } catch (err) {
            return res.status(401).json({
                err: 'Authorization header is invalid'
            });
        }        
        
        
        
//        var jwt = TokenService.verify(token);
//        console.log('Authentication Service');
//        console.log(jwt);
//        if( !TokenService.verify(token) )
//            return res.status(401).json({
//                err: 'Authorization header is invalid'
//            });
        
//        else {
//            var user = {
//                _id:  jwt._id,
//                name: jwt.name
//            };
//            return res.status(200).json({
//                jwt: TokenService.issue( user )
//            });
//        }
    }
    next();
}

// Private methods.
function _isPrivatePage(url) {
    var privatePages = ['/app/pages/home/home.html'];
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