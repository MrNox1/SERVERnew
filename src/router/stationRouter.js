const express = require("express");
const stationModel = require("../controllers/station.model");

const stationRouter = express.Router();

stationRouter.get("/", stationModel.getAllStationController);
stationRouter.post("/", stationModel.addNewStationController);

module.exports = stationRouter;
