const express = require("express");
const {
  getUserById,
  createUser,
  getAllUsers,
  deleteUserById,
  editUserById,
} = require("./user.service");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const users = await getAllUsers();
    res.send(users);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    const user = await getUserById(userId);
    res.send(user);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.post("/", async (req, res) => {
  try {
    const newUserData = req.body;
    const user = await createUser(newUserData);
    res.status(201).send({
      data: user,
      message: "User Succesfully Created",
    });
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    const userData = req.body;

    const user = await editUserById(userId, userData);

    if (
      !(
        userData.name &&
        userData.email &&
        userData.password &&
        userData.phone &&
        userData.address
      )
    ) {
      return res.status(400).send("Field Not Completed");
    }

    res.status(201).send({
      data: user,
      message: "User Succesfully Updated",
    });
  } catch (err) {
    res.status(400).send("galat");
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    const userData = req.body;

    const user = await editUserById(userId, userData);

    res.status(202).send({
      data: user,
      message: "User Succesfully Updated",
    });
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    const userData = req.body;

    await deleteUserById(userId, userData);

    res.send("User Succesfully Deleted");
  } catch (err) {
    res.status(400).send(err.message);
  }
});

module.exports = router;
