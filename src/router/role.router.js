const express = require("express");

const roleRouete = express.Router();

const roleController = require("../controllers/role.conreoller");

roleRouete.get("/", roleController.getAllRole);
roleRouete.get("/:id", roleController.getRolesById);
roleRouete.post("/", roleController.addNewRoles);
roleRouete.put("/", roleController.updateRoles);
roleRouete.delete("/:id", roleController.deleteRoles);

module.exports = roleRouete;
