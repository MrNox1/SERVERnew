const {
  addNewUser,
  deleteUser,
  getUserbyId,
  getAllUsers,
} = require("../models/user.model");

async function getAllUserController(req, res) {
  const result = await getAllUsers();

  // if()
  return res.status(200).json({ result });
}

module.exports = {
  getAllUserController,
};
