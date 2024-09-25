const vehiclesModel = require("../models/vehicles.model");

async function getAllVehicles(req, res) {
  try {
    const result = await vehiclesModel.selectAllVehicles();
    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json({ err });
  }
}

async function getVehiclesById(req, res) {
  const { id } = req.params;
  try {
    console.log(id);
    if (!id) {
      return res.status(404).json({ mess: "id requnred " });
    }
    const result = await vehiclesModel.selectVehiclesById({ id });

    if (!result.rowsAffected[0]) {
      return res.status(404).json({ mes: "invalid id" });
    }

    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json({ err });
  }
}

async function addNewVehicles(req, res) {
  const body = req.body;
  try {
    const result = await vehiclesModel.addNewVehicles(body);

    if (!result.rowsAffected[0]) {
      return res.status(404).json("mess:id invalida ");
    }

    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json({ err });
  }
}

async function deleteVehicles(req, res) {
  const { id } = req.params;

  try {
    if (!id) {
      return res.status(404).json("mess:id requnred ");
    }

    const result = await vehiclesModel.deleteVehiclesById(id);

    if (!result.rowsAffected[0]) {
      return res.status(404).json("mess:id invalida ");
    }

    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json({ err });
  }
}

async function updateVehicles(req, res) {
  const body = req.body;

  try {
    const result = await vehiclesModel.updateVehicles(body);

    if (!result.rowsAffected[0]) {
      return res.status(404).json("mess:id invalida ");
    }

    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json({ err });
  }
}

module.exports = {
  getAllVehicles,
  getVehiclesById,
  addNewVehicles,
  deleteVehicles,
  updateVehicles,
};
