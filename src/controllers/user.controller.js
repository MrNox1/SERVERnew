const {
  addNewUser,
  deleteUser,
  getUserbyId,
  getAllUsers,
} = require("../models/user.model.js");

async function getAllUserController(req, res) {
  try {
    const result = await getAllUsers();

    return res.status(200).json({ result });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
}

async function getUserByIdController(req, res) {
  const { id } = req.params;
  try {
    const result = await getUserbyId({ id: id });

    if (!result.rowsAffected[0]) {
      return res.status(404).json({ err: "usario no encontrado, id invalida" });
    }

    return res.status(200).json(result.recordset[0]);
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
}

module.exports = {
  getAllUserController,
  getUserByIdController,
};
