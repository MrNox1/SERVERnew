const express = require("express");
const stationModel = require("../controllers/station.model");

const stationRouter = express.Router();

stationRouter.get("/", stationModel.getAllStationController);
stationRouter.get("/:id", stationModel.addNewStationController);
stationRouter.post("/", stationModel.selectStationByIdController);
stationRouter.put("/:id", stationModel.updateControllerById);
stationRouter.delete("/:id", stationModel.updateControllerById);

module.exports = stationRouter;
