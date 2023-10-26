const router = require("express").Router();

router.get("/", (req, res, next) => {
  res.json("All good in here");
});


const equipmentsRoutes = require('./equipments.routes')
router.use('/equipments', equipmentsRoutes)


module.exports = router;
