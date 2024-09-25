const express = require("express");
const { addNewUserController } = require("../controllers/register.controller");

const registerRouter = express.Router();

registerRouter.post("/", addNewUserController);

module.exports = registerRouter;
