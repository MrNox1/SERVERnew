const roleModule = require("../models/role.model");

async function getAllRole(req, res) {
  const result = await roleModule.getAllRole();
  console.log(result);
  return res.status(200).json(result);
}

async function getRolesById(req, res) {
  const { id } = req.params;
  try {
    if (!id) {
      return res.status(404).json("mess:id requnred ");
    }
    const result = await roleModule.getRoleById({ id });

    if (!result.rowsAffected[0]) {
      return res.status(404).json({ mess: "id invalida " });
    }

    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json({ err: "malo" });
  }
}

async function addNewRoles(req, res) {
  const body = req.body;

  try {
    const result = await roleModule.addNewRole(body);

    if (!result.rowsAffected[0]) {
      return res.status(404).json({ mess: "id invalida " });
    }

    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json({ err });
  }
}

async function deleteRoles(req, res) {
  const { id } = req.params;

  try {
    if (!id) {
      return res.status(404).json({ mess: "id requnred " });
    }

    const result = await roleModule.deleteRole({ id });

    if (!result.rowsAffected[0]) {
      return res.status(404).json({ mess: "id invalida " });
    }

    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json({ err });
  }
}

async function updateRoles(req, res) {
  const body = req.body;

  try {
    const result = await roleModule.updateRoleById(body);

    if (!result.rowsAffected[0]) {
      return res.status(404).json({ mess: "id invalida " });
    }

    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json({ err });
  }
}

module.exports = {
  getAllRole,
  getRolesById,
  addNewRoles,
  deleteRoles,
  updateRoles,
};
