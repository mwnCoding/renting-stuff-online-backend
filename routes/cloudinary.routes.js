const { isAuthenticated } = require("../middlewares/routeGuard.middleware");
const cloudinary = require("../middlewares/cloudinary.config");

const router = require("express").Router();

(router.post("/"),
  (req, res) => {
    res({ message: "cool" });
  });

router.post("/signUpload", isAuthenticated, (req, res) => {
  const timestamp = Math.round(Date.now() / 1000);
  const { folderName } = req.body;

  const signature = cloudinary.utils.api_sign_request(
    {
      timestamp,
      folder: folderName,
      public_id: req.payload.userId,
      overwrite: true,
      invalidate: true,
    },
    process.env.CLOUDINARY_SECRET,
  );

  res.json({
    timestamp,
    signature,
    cloudName: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    public_id: req.payload.userId,
    overwrite: true,
    invalidate: true,
    folder: folderName,
  });
});

module.exports = router;
