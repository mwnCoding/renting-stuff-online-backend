const Comment = require("../models/Comment.model");
const mongoose = require("mongoose");
const router = require("express").Router();

//Get all comments
router.get("/", (req, res, next) => {
  Comment.find(req.query)
    .populate("createdBy")
    .populate("ownedBy")
    .then((comments) => {
      res.status(200).json(comments);
    })
    .catch((err) => {
      next(err);
    });
});

//Create a new document
router.post("/", (req, res, next) => {
  const { content, rating, createdBy, ownedBy } = req.body;
  Comment.create({ content, rating, createdBy, ownedBy })
    .then((createdComment) => {
      res.status(201).json(createdComment);
    })
    .catch((err) => {
      next(err);
    });
});

//Get a specific comment
router.get("/:commentId", (req, res, next) => {
  const { commentId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(commentId)) {
    res.status(400).json({ message: `Specified id is not valid` });
  }
  Comment.findById(commentId)
    .populate("createdBy")
    .populate("ownedBy")
    .then((updatedComment) => {
      res.status(200).json(updatedComment);
    })
    .catch((err) => {
      next(err);
    });
});

//Update a specific comment
router.put("/:commentId", (req, res, next) => {
  const { commentId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(commentId)) {
    res.status(400).json({ message: `Specified id is not valid` });
  }
  Comment.findByIdAndUpdate(commentId, req.body, { new: true })
    .then((updatedComment) => {
      res.status(200).json(updatedComment);
    })
    .catch((err) => {
      next(err);
    });
});

//Delete a specific comment
router.delete("/:commentId", (req, res, next) => {
  const { commentId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(commentId)) {
    res.status(400).json({ message: `Specified id is not valid` });
  }

  Comment.findByIdAndRemove(commentId)
    .then(() => {
      res
        .status(200)
        .json({ message: `Comment has been deleted successfully` });
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
