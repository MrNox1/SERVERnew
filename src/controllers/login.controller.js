const { userValidation } = require("../models/user.model");
const jsonwebtoken = require("jsonwebtoken");
const secret = require("../secret");

async function userLoginController(req, res) {
  const { userName, password } = req.body;
  try {
    const user = await userValidation({ userName, password });

    // if (user?.mess) {
    //   return res.status(404).json({ mess: "El usuario no existe" });
    // }
    console.log(user);
    const token = jsonwebtoken.sign(user, secret.id, { expiresIn: 86400 });

    return res.status(200).json(token);
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
}

module.exports = {
  userLoginController,
};
