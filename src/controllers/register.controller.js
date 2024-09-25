const jsonwebtoken = require("jsonwebtoken");
const { addNewUser } = require("../models/user.model.js");
const secret = require("../secret.js");

async function addNewUserController(req, res) {
  const body = req.body;
  try {
    const result = await addNewUser(body);

    if (result.error) {
      return res.status(400).json({ err: "usuario ya existe" });
    }

    const token = jsonwebtoken.sign(result, secret.id, { expiresIn: 86400 });

    return res.status(200).json({ token });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
}

module.exports = {
  addNewUserController,
};
