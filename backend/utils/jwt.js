var jwt = require('jsonwebtoken');

function createToken(user) {
    var token = jwt.sign(user, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
    return token;
}

function verifyToken(token) {
    try {
        var decoded = jwt.verify(token, process.env.JWT_SECRET);
        return decoded;
    } catch (e) {
        console.error(e);
        return false;
    }
}

module.exports = {
    createToken,
    verifyToken
}