const express = require("express");
const jsonwebtoken = require("jsonwebtoken");
const secret = require("./secret.js");
const helmet = require("helmet");

const roleRouter = require("./router/role.router.js");

const { addNewUserController } = require("./controllers/register.controller");
const { userValidation } = require("./models/user.model.js");
const {
  getAllUserController,
  getUserByIdController,
} = require("./controllers/user.controller");

const app = express();
app.use(helmet());
app.use(express.json());

app.get("/", (req, res) => {
  res.json("hola");
});
app.get("/users", getAllUserController);
app.get("/users/:id", getUserByIdController);
app.post("/register", addNewUserController);
app.post("/login", async (req, res) => {
  const { userName, password } = req.body;
  try {
    const user = await userValidation({ userName, password });

    if (user.mess) {
      return res.status(404).json({ mess: "El usuario no existe" });
    }

    const token = jsonwebtoken.sign(user, secret.id, { expiresIn: 86400 });

    return res.status(200).json(token);
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
});

app.use("/roles", roleRouter);

// const vehiclesController = require("./controllers/vehicles.controller.js");

// app.get("/vehicles", vehiclesController.getAllVehicles);
// app.get("/vehicles/:id", vehiclesController.getVehiclesById);
// app.post("/vehicles", vehiclesController.addNewVehicles);
// app.put("/vehicles", vehiclesController.updateVehicles);
// app.delete("/vehicles/:id", vehiclesController.deleteVehicles);

const brandController = require("./controllers/brand.controller.js");

app.get("/brands", brandController.getAllBrand);
app.get("/brands/:id", brandController.getBrandById);
app.post("/brands", brandController.addNewBrands);
app.put("/brands", brandController.updateBrand);
app.delete("/brands/:id", brandController.deleteBrand);

const discountController = require("./controllers/discount.controller.js");

app.get("/discounts", discountController.getAllStratumDiscount);
app.get("/discounts/:id", discountController.getStratumDiscountById);
app.post("/discounts", discountController.addNewStratumDiscounts);
app.put("/discounts", discountController.updateStratumDiscount);
app.delete("/discounts/:id", discountController.deleteStratumDiscount);

module.exports = app;
