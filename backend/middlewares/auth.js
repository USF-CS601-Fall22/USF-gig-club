var jwtutils = require('../utils/jwt');

function authenticate(req, res, next) {
    var header = req.headers['authorization'];
    
    if (header == null) return res.sendStatus(401);
    
    var token = header.split(' ')[1];
    
    if (token == null) return res.sendStatus(401);

    var isVerified = jwtutils.verifyToken(token);
    if (!isVerified) {
        return res.sendStatus(403);
    }
    req.user = isVerified;
    next();
}

module.exports = {
    authenticate
}