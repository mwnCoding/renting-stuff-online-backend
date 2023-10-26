const mongoose = require("mongoose");

const { Schema, model } = require("mongoose");

const commentSchema = new Schema({
  content: {
    type: String,
    required: [true, "Content is required"],
    minLength: 20,
    maxLength: 150,
  },
  rating: {
    type: Number,
    required: [true, "Rating is required"],
    min: 0,
    max: 5,
  },
  createdBy: {
    required: [true, "Created By is required"],
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  ownedBy: {
    required: [true, "Owned By is required"],
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Comment = model("Comment", commentSchema);

module.exports = Comment;
