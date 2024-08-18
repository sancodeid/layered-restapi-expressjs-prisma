const express = require("express");
const dotenv = require("dotenv");
const { PrismaClient } = require("@prisma/client");
const app = express();

const prisma = new PrismaClient();

dotenv.config();
const PORT = process.env.PORT;

app.use(express.json());

const userController = require("./users/user.controller");

app.use("/users", userController);

app.get("/api", (req, res) => {
  res.send("Welcome to my API");
});

app.listen(PORT, () => {
  console.log("Running on port " + PORT);
});
