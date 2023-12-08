const bcrypt = require('bcrypt');
const HashPassword = async (password) => {
    return new Promise((accept, reject) => {
        const saltRounds = 10
        bcrypt.genSalt(saltRounds, function (err, salt) {
            if (err) reject(err)
            bcrypt.hash(password, salt, function (err, hash) {
                if (err) reject(err)
                console.log(hash)
                accept(hash)
            });
        });


    })
}

const comparePassword = async (password , hash) => {
    return new Promise((accept, reject) => {
            bcrypt.compare(password, hash, function (err, result) {
                if (err) reject({'next time error':err})
                accept(result)
            });
    })
}


module.exports = { HashPassword, comparePassword }

