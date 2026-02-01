const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User.model");
const { isAuthenticated } = require("../middlewares/routeGuard.middleware");
const cloudinary = require("../middlewares/cloudinary.config");

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

router.get("/verify", isAuthenticated, async (request, response) => {
  try {
    console.log(request.payload.userId);
    const user = await User.findById(request.payload.userId);
    response.json(user);
  } catch (error) {
    response.status(400).json({ message: "User not found" });
  }
});

// router.post("/signUpload", isAuthenticated, (req, res) => {
//   const timestamp = Math.round(Date.now() / 1000);

//   const signature = cloudinary.utils.api_sign_request(
//     {
//       timestamp,
//       folder: "profilePictureRSO",
//       public_id: req.payload.userId,
//       overwrite: true,
//       invalidate: true,
//     },
//     process.env.CLOUDINARY_SECRET,
//   );

//   res.json({
//     timestamp,
//     signature,
//     cloudName: process.env.CLOUDINARY_NAME,
//     api_key: process.env.CLOUDINARY_KEY,
//     public_id: req.payload.userId,
//     overwrite: true,
//     invalidate: true,
//     folder: "profilePictureRSO",
//   });
// });

module.exports = router;
