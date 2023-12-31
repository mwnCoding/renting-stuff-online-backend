const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User.model");
const { isAuthenticated } = require("../middlewares/routeGuard.middleware");
const fileUploader = require("../middlewares/cloudinary.config");

const router = require("express").Router();

router.get("/", (req, res, next) => {
  res.json("All good in auth");
});

//Post to Signup
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

//Post to Login
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
        }
      );
      response.status(200).json({ token: authToken });
    } else {
      response.status(400).json({ message: "Wrong password" });
    }
  } else {
    response.status(400).json({ message: "User does not exist" });
  }
});

router.get("/verify", isAuthenticated, (request, response) => {
  response.json(request.payload);
});

router.put(
  "/upload",
  fileUploader.single("imageUrl"),
  async (req, res, next) => {
    if (req.file) {
      res.status(200).json({ file: `${req.file.path}` });
    } else {
      res.status(401).json({ message: "File upload error please try again" });
    }
  }
);

module.exports = router;
