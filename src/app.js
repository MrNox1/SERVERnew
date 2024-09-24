const express = require("express");
const { getAllUserController } = require("./controllers/user.controller");

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({ name: "leo" });
});

app.get("/user", getAllUserController);

// app.get("/user/:id");

// app.put("/resgister");

// app.post("/login");

module.exports = app;
