const express = require("express");
const userController = require("../models/user.model.js");

const usersRouter = express.Router();

usersRouter.get("/", userController.getAllUsers);
usersRouter.get("/:id", userController.getUserbyId);
usersRouter.delete("/:id", userController.getUserbyId);

module.exports = usersRouter;
