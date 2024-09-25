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

module.exports = {
  addNewStationController,
  getAllStationController,
};
