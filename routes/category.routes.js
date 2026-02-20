const Category = require("../models/Category.model");

const router = require("express").Router();

//Get all categories
router.get("/", async (req, res, next) => {
  try {
    const categories = await Category.find({});
    console.log(categories);
    return res.status(201).json(categories);
  } catch (error) {
    console.error(error);
    return res.status(401).json(error);
  }
});

//Create new category
router.post("/", async (req, res, next) => {
  try {
    const { name, color } = req.body;
    if (!name || name.length < 3 || name.length > 20)
      return res.status(401).json({ message: "Invalid name for cateogry" });
    const createdCategory = await Category.create({ name, color });
    return res.status(201).json(createdCategory);
  } catch (error) {
    console.error(error);
    return res.status(401).json(error);
  }
});

module.exports = router;
