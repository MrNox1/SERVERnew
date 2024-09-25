const brandModel = require("../models/brand.model.js");

async function getAllBrand(req, res) {
  try {
    const result = await brandModel.selectAllBrand();
    console.log(result);
    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

async function getBrandById(req, res) {
  const { id } = req.params;
  try {
    if (!id) {
      return res.status(400).json({ message: "ID requerido." });
    }

    const result = await brandModel.selectBrandById({ id });

    if (!result.length) {
      return res.status(404).json({ message: "ID inválido." });
    }

    return res.status(200).json(result[0]);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

async function addNewBrands(req, res) {
  const body = req.body;
  try {
    const result = await brandModel.addNewBrand(body);
    console.log(result);

    if (!result) {
      return res.status(400).json({ error: "no ingresado " });
    }

    return res.status(201).json(result); // Cambiado a 201 para creación exitosa
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

async function deleteBrand(req, res) {
  const { id } = req.params;

  try {
    if (!id) {
      return res.status(400).json({ message: "ID requerido." });
    }

    const result = await brandModel.deleteBrandById({ id }); // Asegúrate de pasar un objeto

    console.log(result);

    if (!result.rowsAffected || !result.rowsAffected[0]) {
      return res.status(404).json({ message: "ID inválido." });
    }

    return res.status(200).json({ message: "Marca eliminada con éxito." });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

async function updateBrand(req, res) {
  const { name } = req.body;
  const { id } = req.params;
  console.log(name, id);
  try {
    const result = await brandModel.updateBrand({ id, name });
    console.log(result);
    if (!result) {
      return res.status(404).json({ message: "ID inválido." });
    }

    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

module.exports = {
  getAllBrand,
  getBrandById,
  addNewBrands,
  deleteBrand,
  updateBrand,
};
