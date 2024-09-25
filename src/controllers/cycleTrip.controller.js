const {
  addNewCycleTrip,
  deleteCycleTripById,
  selectAllCycleTri,
  selectCycleTripById,
  updateCycleTripById,
} = require("../models/cycleTrip.models");

async function addNewCycleTripController(req, res) {
  const { name, init, finish, price, descript } = req.body;
  try {
    const result = await addNewCycleTrip({
      name,
      inicial: init,
      finish,
      price,
      descipt: descript,
    });

    if (!result.data) {
      return res.status(400).json({ err: "Error: valores no válidos" });
    }
    return res.status(200).json({ data: result });
  } catch (err) {
    console.error(err);
    return res.status(400).json({ err: "Error al agregar ciclo de viaje" });
  }
}

async function getAllCycleTripController(req, res) {
  try {
    const result = await selectAllCycleTri();
    return res.status(200).json(result);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ err: "Error al obtener ciclos de viaje" });
  }
}

async function getCycleTripByIdController(req, res) {
  const { id } = req.params;
  console.log(id);
  try {
    const result = await selectCycleTripById({ id });

    if (result.data) {
      return res.status(404).json({ err: "Ciclo de viaje no encontrado" });
    }
    console.log(result);
    return res.status(200).json({ result });
  } catch (err) {
    console.error(err); // Log para depuración
    return res.status(500).json({ err: "Error al obtener ciclo de viaje" });
  }
}

async function updateCycleTripByIdController(req, res) {
  const { id } = req.params;
  const updateData = req.body;
  try {
    if (!id) {
      return res.status(404).json({ message: "ID no válido" });
    }

    const result = await updateCycleTripById({ id, ...updateData });

    if (!result.rowsAffected[0]) {
      return res.status(404).json({ message: "Ciclo de viaje no encontrado" });
    }

    return res.status(200).json(result);
  } catch (err) {
    console.error(err); // Log para depuración
    return res.status(500).json({ err: "Error al actualizar ciclo de viaje" });
  }
}

async function deleteCycleTripByIdController(req, res) {
  const { id } = req.params;

  try {
    if (!id) {
      return res.status(404).json({ message: "ID no válido" });
    }

    const result = await deleteCycleTripById({ id });

    if (result.error) {
      // Cambié la validación
      return res.status(404).json({ message: "Ciclo de viaje no encontrado" });
    }

    return res.status(200).json(result);
  } catch (err) {
    console.error(err); // Log para depuración
    return res.status(500).json({ err: "Error al eliminar ciclo de viaje" });
  }
}

module.exports = {
  addNewCycleTripController,
  getAllCycleTripController,
  getCycleTripByIdController,
  updateCycleTripByIdController,
  deleteCycleTripByIdController,
};
