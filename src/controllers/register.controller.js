const { addNewUser } = require("../models/user.model.js");

async function addNewUserController(req, res) {
  const body = req.body;
  try {
    const result = await addNewUser(body);

    if (result.mess) {
      return res.status(400).json(result);
    }

    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
}

module.exports = {
  addNewUserController,
};
