const { json } = require("express");
const {
  addNewStation,
  deleteStationById,
  selectAllStation,
  selectStationById,
  updateStation,
} = require("../models/station.model");

async function addNewStationController(req, res) {
  const { name, address, state, coordinates } = req.body;
  console.log(req.body);
  try {
    const result = await addNewStation({
      name,
      address,
      state,
      coordinates,
    });

    if (!result.data) {
      return res.status(400).json({ err: "valores" });
    }
    return res.status(200).json({ data: result });
  } catch (err) {
    return res.status(400).json({ err: "error agregado estacion" });
  }
}
async function getAllStationController(req, res) {
  try {
    const result = await selectAllStation();
    console.log(result);
    if (!result.data) {
      return res.status(400).json({ err: "valores" });
    }
    return res.status(200).json({ result });
  } catch (err) {}
}
async function selectStationByIdController(req, res) {
  const { id } = res.params;
  try {
    const result = await selectStationById({ id });
    console.log(result);
    if (!result.data) {
      return res.status(400).json({ err: "valores" });
    }
    return res.status(200).json({ result });
  } catch (err) {}
}

async function updateControllerById(req, res) {
  const { id } = req.params;
  const { name, address, state, coordinates } = req.body;
  try {
    const result = await updateStation({
      id,
      name,
      address,
      state,
      coordinates,
    });
    console.log(result);
    if (!result.data) {
      return res.status(400).json({ err: "valores" });
    }
    return res.status(200).json({ result });
  } catch (err) {}
}

async function updateControllerById(req, res) {
  const { id } = req.params;
  const { name, address, state, coordinates } = req.body;
  try {
    const result = await updateStation({
      id,
      name,
      address,
      state,
      coordinates,
    });
    console.log(result);
    if (!result.data) {
      return res.status(400).json({ err: "valores" });
    }
    return res.status(200).json({ result });
  } catch (err) {}
}

async function deleteControllerById(req, res) {
  const { id } = req.params;
  try {
    const result = deleteStationById({ id });
    console.log(result);
    if (!result) {
      return res.json(404).json({ error: "unvalid id" });
    }

    return res.status(200).json(result);
  } catch (err) {
    console.error(err);
  }
}
module.exports = {
  addNewStationController,
  getAllStationController,
  selectStationByIdController,
  updateControllerById,
  deleteControllerById,
};
