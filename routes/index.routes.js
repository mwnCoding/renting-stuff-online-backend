const router = require("express").Router();

const equipmentsRoutes = require("./equipments.routes");
router.use("/equipments", equipmentsRoutes);

const categoryRoutes = require("./category.routes");
router.use("/categories", categoryRoutes);

const userRoutes = require("./user.routes");
router.use("/user", userRoutes);

const commentsRoutes = require("./comments.routes");
router.use("/comments", commentsRoutes);

const requestsRoutes = require("./requests.routes");
router.use("/requests", requestsRoutes);

const cloudinaryRoutes = require("./cloudinary.routes");
router.use("/cloudinary", cloudinaryRoutes);

module.exports = router;
