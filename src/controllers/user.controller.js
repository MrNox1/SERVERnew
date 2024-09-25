const {
  addNewUser,
  deleteUser,
  getUserbyId,
  getAllUsers,
  changeState,
} = require("../models/user.model.js");

async function getAllUserController(req, res) {
  try {
    const result = await getAllUsers();
    console.log(result);
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

async function cangeStateUserController(req, res) {
  const { id } = req.params;
  try {
    const result = await changeState({ id });

    if (result.error) return res.status(400).json({ message: result.message });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
}

module.exports = {
  getAllUserController,
  getUserByIdController,
  cangeStateUserController,
};
