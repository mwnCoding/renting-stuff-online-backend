const mongoose = require("mongoose");

const { Schema, model } = require("mongoose");

const categorySchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    minLength: 3,
    maxLength: 30,
    unique: true,
  },
  color: {
    type: String,
    required: false,
    minLenght: 3,
    maxLength: 20,
    default: "blue",
  },
});

const Category = model("Category", categorySchema);

module.exports = Category;
