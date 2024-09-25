const express = require("express");
const jsonwebtoken = require("jsonwebtoken");
const secret = require("./secret.js");
const helmet = require("helmet");
const cors = require("cors");

const roleRouter = require("./router/role.router.js");
const LoginRouter = require("./router/login.router.js");
const registerRouter = require("./router/register.router.js");
const usersRouter = require("./router/role.router.js");

const { addNewUserController } = require("./controllers/register.controller");

const {
  getAllUserController,
  getUserByIdController,
} = require("./controllers/user.controller");

const app = express();
app.use(helmet());
app.use(core());
app.use(express.json());

app.use("/login", LoginRouter);
app.use("/register", registerRouter);
app.use("/users", usersRouter);

app.get("/", (req, res) => {
  res.json("hola");
});
app.get("/users", getAllUserController);
app.get("/users/:id", getUserByIdController);
app.post("/register", addNewUserController);

// app.post("/login", async);

app.use("/roles", roleRouter);

// const vehiclesController = require("./controllers/vehicles.controller.js");

// app.get("/vehicles", vehiclesController.getAllVehicles);
// app.get("/vehicles/:id", vehiclesController.getVehiclesById);
// app.post("/vehicles", vehiclesController.addNewVehicles);
// app.put("/vehicles", vehiclesController.updateVehicles);
// app.delete("/vehicles/:id", vehiclesController.deleteVehicles);

const {
  getAllBrand,
  addNewBrands,
  getBrandById,
  updateBrand,
  deleteBrand,
} = require("./controllers/brand.controller.js");

app.get("/brands", getAllBrand);
app.get("/brands/:id", getBrandById);
app.post("/brands", addNewBrands);
app.put("/brands/:id", updateBrand);
app.delete("/brands/:id", deleteBrand);

const discountController = require("./controllers/discount.controller.js");

app.get("/discounts", discountController.getAllStratumDiscount);
app.get("/discounts/:id", discountController.getStratumDiscountById);
app.post("/discounts", discountController.addNewStratumDiscounts);
app.put("/discounts", discountController.updateStratumDiscount);
app.delete("/discounts/:id", discountController.deleteStratumDiscount);

module.exports = app;
