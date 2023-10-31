const router = require("express").Router();

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

const equipmentsRoutes = require("./equipments.routes");
router.use("/equipments", equipmentsRoutes);



const userRoutes = require('./user.routes')
router.use('/user', userRoutes)


const commentsRoutes = require("./comments.routes");
router.use("/comments", commentsRoutes);

const requestsRoutes = require("./requests.routes");
router.use("/requests", requestsRoutes)


module.exports = router;
