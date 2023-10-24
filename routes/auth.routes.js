const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User.model");

const router = require("express").Router();

router.get("/", (req, res, next) => {
  res.json("All good in auth");
});

router.post("/signup", async (request, response) => {
  const salt = bcrypt.genSaltSync(13);
  const passwordHash = bcrypt.hashSync(request.body.password, salt);

  try {
    const newUser = await User.create({ ...request.body, passwordHash });
    res.status(201).json(newUser);
  } catch (error) {
    console.log(error);
  }
});
module.exports = router;