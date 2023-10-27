const router = require("express").Router();

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

const equipmentsRoutes = require("./equipments.routes");
router.use("/equipments", equipmentsRoutes);

const commentsRoutes = require("./comments.routes");
router.use("/comments", commentsRoutes);

module.exports = router;
