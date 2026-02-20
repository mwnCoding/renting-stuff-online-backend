const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User.model");
const { isAuthenticated } = require("../middlewares/routeGuard.middleware");

const router = require("express").Router();

router.get("/", (req, res, next) => {
  res.json("All good in auth");
});

//Signup user
router.post("/signup", async (request, response) => {
  const salt = bcrypt.genSaltSync(13);
  console.log(request.body.password);
  const passwordHash = bcrypt.hashSync(request.body.password, salt);

  try {
    const newUser = await User.create({ ...request.body, passwordHash });
    response.status(201).json(newUser);
  } catch (error) {
    console.log(error);
    response.status(400).json(error);
  }
});

//Login User
router.post("/login", async (request, response) => {
  const { email, password } = request.body;
  const potentialUser = await User.findOne({ email });

  if (potentialUser) {
    if (bcrypt.compareSync(password, potentialUser.passwordHash)) {
      const authToken = jwt.sign(
        { userId: potentialUser._id },
        process.env.TOKEN_SECRET,
        {
          algorithm: "HS256",
          expiresIn: "6h",
        },
      );
      response.status(200).json({ token: authToken });
    } else {
      response.status(400).json({ message: "Wrong password" });
    }
  } else {
    response.status(400).json({ message: "User does not exist" });
  }
});

//Verify user
router.get("/verify", isAuthenticated, async (request, response) => {
  try {
    console.log(request.payload.userId);
    const user = await User.findById(request.payload.userId);
    response.json(user);
  } catch (error) {
    response.status(400).json({ message: "User not found" });
  }
});

module.exports = router;
