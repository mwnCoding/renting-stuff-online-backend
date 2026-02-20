const mongoose = require("mongoose");

const { Schema, model } = require("mongoose");

const requestSchema = new Schema(
  {
    requesterId: {
      required: [true, "Requester Id is required"],
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    equipmentId: {
      required: [true, "Equipment Id is required"],
      type: mongoose.Schema.Types.ObjectId,
      ref: "Equipment",
    },
    ownerId: {
      required: [true, "Requester Id is required"],
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    requestMessage: {
      type: String,
      required: [true, "Request Message is required"],
      minLength: 10,
    },
    responseMessage: {
      type: String,
    },
    startDate: {
      type: Date,
      default: Date.now,
    },
    endDate: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "declined"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  },
);

const Request = model("Request", requestSchema);

module.exports = Request;
