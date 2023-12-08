var jwt = require('jsonwebtoken');
const JSONWebToken = async (payload) => {
    return new Promise((done, reject) => {
        jwt.sign({ ...payload }, 'this_is_my_secret_Key', function (err, token) {
            if (err) reject(err)
            done(token)
        });
    })
}

module.exports = { JSONWebToken }