const mongoose = require("mongoose");

const { Schema, model } = require("mongoose");

const Equipment = require("./Equipment.model");

const Comment = require("./Comment.model");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required."],
      unique: true,
      lowercase: true,
      trim: true,
    },
    passwordHash: {
      type: String,
      required: [true, "Password is required."],
    },
    firstName: {
      type: String,
      required: [true, "First name is required"],
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
    },
    imageUrl: {
      type: String,
      default: "../src/assets/defaultAvatar.png",
    },
    equipment: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Equipment",
      default: [],
    },
    comments: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Comment",
      default: [],
    },
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  },
);

const User = model("User", userSchema);

module.exports = User;
