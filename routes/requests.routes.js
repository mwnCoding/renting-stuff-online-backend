const Request = require("../models/Request.model");
const mongoose = require("mongoose");
const router = require("express").Router();

router.get("/", (req, res, next) => {
  Request.find(req.query)
    .populate("requesterId")
    .populate("ownerId")
    .populate("equipmentId")
    .then((requests) => {
      res.status(200).json(requests);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/", (req, res, next) => {
  const {
    requesterId,
    equipmentId,
    ownerId,
    requestMessage,
    responseMessage,
    startDate,
    endDate,
    status,
  } = req.body;
  Request.create({
    requesterId,
    equipmentId,
    ownerId,
    requestMessage,
    responseMessage,
    startDate,
    endDate,
    status,
  })
    .then((createdRequest) => {
      res.status(200).json(createdRequest);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/:requestId", (req, res, next) => {
  const { requestId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(requestId)) {
    res.status(400).json({ message: `Specified id is not valid` });
  }
  Request.findById(requestId)
    .populate("requesterId")
    .populate("ownerId")
    .populate("equipmentId")
    .then((foundRequest) => {
      res.status(200).json(foundRequest);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.put("/:requestId", (req, res, next) => {
  const { requestId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(requestId)) {
    res.status(400).json({ message: `Specified id is not valid` });
  }
  Request.findByIdAndUpdate(requestId, req.body, { new: true })
    .populate("requesterId")
    .populate("ownerId")
    .populate("equipmentId")
    .then((updatedRequest) => {
      res.status(200).json(updatedRequest);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.delete("/:requestId", (req, res, next) => {
  const { requestId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(requestId)) {
    res.status(400).json({ message: `Specified id is not valid` });
  }
  Request.findByIdAndRemove(requestId)
    .then(() => {
      res.status(200).json({ message: `The request has been deleted` });
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
