const discountModel = require("../models/discount.model");

async function getAllStratumDiscount(req, res) {
  try {
    const result = await discountModel.getAllStratumDiscount();
    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json({ err });
  }
}

async function getStratumDiscountById(req, res) {
  const { id } = req.params;
  try {
    if (!id) {
      return res.status(404).json("mess:id requnred ");
    }
    const result = await discountModel.deleteStratumDiscountById({ id });

    if (!result.rowsAffected[0]) {
      return res.status(404).json("mess:id invalida ");
    }

    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json({ err });
  }
}

async function addNewStratumDiscounts(req, res) {
  const body = req.body;
  try {
    const result = await discountModel.addNewStratumDiscount(body);

    if (!result.rowsAffected[0]) {
      return res.status(404).json("mess:id invalida ");
    }

    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json({ err });
  }
}

async function deleteStratumDiscount(req, res) {
  const { id } = req.params;

  try {
    if (!id) {
      return res.status(404).json("mess:id requnred ");
    }

    const result = await discountModel.deleteStratumDiscountById(id);

    if (!result.rowsAffected[0]) {
      return res.status(404).json("mess:id invalida ");
    }

    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json({ err });
  }
}

async function updateStratumDiscount(req, res) {
  const body = req.body;

  try {
    const result = await discountModel.updateStratumDiscount(body);

    if (!result.rowsAffected[0]) {
      return res.status(404).json("mess:id invalida ");
    }

    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json({ err });
  }
}

module.exports = {
  getAllStratumDiscount,
  getStratumDiscountById,
  addNewStratumDiscounts,
  deleteStratumDiscount,
  updateStratumDiscount,
};
