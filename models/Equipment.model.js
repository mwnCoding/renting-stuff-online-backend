const mongoose = require("mongoose");
const { Schema, model } = require("mongoose");

const equipmentSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    description: {
      type: String,
      minLength: 20,
      maxLength: 150,
    },
    imageUrl: {
      type: String,
      default: "",
    },
    condition: {
      type: String,
      enum: ["poor", "used", "good", "new"],
    },
    categories: {
      type: [String],
      enum: [
        "Tennis",
        "Climbing",
        "Fishing",
        "Hiking",
        "Surfing",
        "Biking",
        "Skiing",
      ],
    },
    ownedBy: {
      required: [true, "Owned By is required"],
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    rentedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    available: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Equipment = model("Equipment", equipmentSchema);

module.exports = Equipment;
