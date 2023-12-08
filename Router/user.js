const routes = require("express").Router()
const {sign_up,sign_in,users} = require("../controller/user.js")
const auth = require("../middlewares/authenticateToken.js")
routes.post("/register",sign_up);
routes.post("/login",sign_in);
routes.get("/users",auth,users);

module.exports = routes;