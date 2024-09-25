const express = require("express");
const {
  addNewCycleTripController,
  getAllCycleTripController,
  deleteCycleTripByIdController,
  updateCycleTripByIdController,
  getCycleTripByIdController,
} = require("../controllers/cycleTrip.controller");

const ciclopaseoRouter = express.Router();

ciclopaseoRouter.get("/", getAllCycleTripController);
ciclopaseoRouter.get("/:id", getCycleTripByIdController);
ciclopaseoRouter.put("/:id", updateCycleTripByIdController);
ciclopaseoRouter.delete("/:id", deleteCycleTripByIdController);

ciclopaseoRouter.post("/", addNewCycleTripController);

module.exports = ciclopaseoRouter;
