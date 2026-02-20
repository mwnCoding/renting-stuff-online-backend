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
      default:
        "https://res.cloudinary.com/dq06ojue1/image/upload/v1698659751/trsfpj0z9irvccspskqu.jpg",
    },
    condition: {
      type: String,
      enum: ["poor", "used", "good", "new"],
    },
    categories: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Category",
      default: [],
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
  },
);

const Equipment = model("Equipment", equipmentSchema);

module.exports = Equipment;
