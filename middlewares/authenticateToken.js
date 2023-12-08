const jwt = require('jsonwebtoken');
const resposeMessage = require("../constant/responseMessage")

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if (token == null) return res.send({ status: false, message: resposeMessage.UNAUThORIZED })
  jwt.verify(token, 'this_is_my_secret_Key', (err, user) => {
    console.log(err)
    if (err) return res.send({ status: false, message: resposeMessage.UNAUThORIZED })
    next()
  })
}

module.exports = authenticateToken;