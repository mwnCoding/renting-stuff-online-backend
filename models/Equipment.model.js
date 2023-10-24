const mongoose = require("mongoose");
const { Schema, model } = require("mongoose");

const equipmentSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    description: String,
    imageUrl: String,
    condition: {
      type: String,
      enum: ["poor", "used", "good", "new"],
    },
    OwnedBy: {
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
