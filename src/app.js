const express = require("express");
const { addNewUserController } = require("./controllers/register.controller");
const { userValidation } = require("./models/user.model.js");
const {
  getAllUserController,
  getUserByIdController,
} = require("./controllers/user.controller");

const app = express();
app.use(express.json());

app.get("/users", getAllUserController);
app.get("/users/:id", getUserByIdController);
app.post("/register", addNewUserController);
app.post("/login", async (req, res) => {
  const { userName, password } = req.body;
  try {
    const user = await userValidation({ userName, password });

    if (user.mess) {
      return res.status(404).json({ mess: "El usuario no existe" });
    }

    return res.status(200).json(user);
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
});

module.exports = app;
