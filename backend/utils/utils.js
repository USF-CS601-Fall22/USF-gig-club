var bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');

function constructSuccessJson(e) {
    return {
        message: "success",
        data: e
    }
}

function createUniqueUUID(){
    return uuidv4()
}

function constructErrorJson(m, e) {
    return {
        message: m,
        error: e
    }
}

function createHash(e) {
    return bcrypt.hashSync(e, 10);
}

function verifyHash(password, hash) {
    return bcrypt.compareSync(password, hash);
}

module.exports = {
    constructErrorJson,
    constructSuccessJson,
    createHash,
    verifyHash,
    createUniqueUUID
}