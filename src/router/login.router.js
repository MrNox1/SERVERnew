const express = require("express");
const { userLoginController } = require("../controllers/login.controller");

const LoginRouter = express.Router();

LoginRouter.post("/", userLoginController);

module.exports = LoginRouter;
