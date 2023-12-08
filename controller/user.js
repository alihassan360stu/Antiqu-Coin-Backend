const db = require("../mysql/index");
const resposeMessage = require("../constant/responseMessage");
const validation = require("../constant/inCommingRequestValidation");
const { HashPassword, comparePassword } = require("../security/hashPassword")
const { JSONWebToken } = require('../security/webToken')

const register = async (res, req, next) => {
  const { name, email, password, confirm } = res.body;
  // validation of is empty
  try {
    let isValid = await validation.isEmpty({ name, email, password, confirm });
    if (isValid.state === true) {
      // if(!validation.isEmail({email})) return req.send({state:false,message:resposeMessage.INVALID_EMAIL(email)})
      if (await validation.isExist({ email })) return req.send({ state: false, message: resposeMessage.ALREADY_EXIST })
      if (!validation.isEqual(password, confirm)) return req.send({ state: false, message: resposeMessage.PASSWORD_NOT_EQUAL })
    }
    else return req.send({ state: false, message: resposeMessage.MISSING_PARAMS(isValid.missing) })
  } catch (e) {
    return req.send({ state: false, message: resposeMessage.SOME_THING_WENT_WRONG })
  }

  let user = []
  try {
    let hash = await HashPassword(password)
    user = new db.User({ name, email, password: hash });
    await user.save();
  } catch (e) {
    console.log(e);
    return req.send({ state: false, message: resposeMessage.SOME_THING_WENT_WRONG })
  }
  req.send({ status: true, message: "user created successfully", data: user })
};


const sign_in = async (res, req, next) => {

  const { email, password } = res.body;
  try {
    let isValid = await validation.isEmpty({ email, password });
    if (!isValid.state) req.send({ state: false, message: resposeMessage.MISSING_PARAMS(isValid.missing) })
    let user = await db.User.findAll({ where: { email } })
    if (!(Array.isArray(user) && user.length > 0)) req.send({ state: false, message: resposeMessage.USER_NOT_FOUND })
    if (!await comparePassword(password, user[0].password)) return req.send({ state: false, message: resposeMessage.PASSWORD_NOT_EQUAL })
    let payload = {
      name: user[0].name,
      email,
      password
    }
    let token = await JSONWebToken(payload);
    return req.send({ status: true, message: "user login successfully",token,data:user[0]})
  } catch (e) {
    console.log(e)
    return req.send({ state: false, message: resposeMessage.SOME_THING_WENT_WRONG })
  }
}



const users = async (res, req, next) => {
  try {
    let user = await db.User.findAll()
    return req.send({ status: true, message: "user login successfully",user})
  } catch (e) {
    console.log(e)
    return req.send({ state: false, message: resposeMessage.SOME_THING_WENT_WRONG })
  }
}

module.exports = { sign_up: register, sign_in ,users};
