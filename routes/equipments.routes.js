const Equipment = require("../models/Equipment.model");
const Request = require("../models/Request.model");
const mongoose = require("mongoose");
const router = require("express").Router();

const fileUploader = require("../middlewares/cloudinary.config");

router.get("/", (req, res, next) => {
  const { available, ownedBy, categories, search } = req.query;
  let query = {};

  if (categories) {
    query.categories = categories;
  }

  if (available) {
    query.available = available;
  }

  if (ownedBy) {
    query.ownedBy = ownedBy;
  }

  if (search) {
    query = {
      ...query,
      $or: [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ],
    };
  }

  Equipment.find(query)
    .populate("ownedBy")
    .then((equipments) => {
      console.log(equipments);
      res.status(200).json(equipments);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "Internal server error" });
    });
});

router.get("/:equipmentId", (req, res, next) => {
  const { equipmentId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(equipmentId)) {
    res.status(400).json({ message: `Specified id is not valid` });
  }

  Equipment.findById(equipmentId)
    .populate("ownedBy")
    .then((foundEquipment) => {
      console.log(foundEquipment);
      res.status(200).json(foundEquipment);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.put(
  "/upload",
  fileUploader.single("imageUrl"),
  async (req, res, next) => {
    if (req.file) {
      res.status(200).json({ file: `${req.file.path}` });
    } else {
      res.status(401).json({ message: "File upload error please try again" });
    }
  }
);

router.post("/", (req, res, next) => {
  const {
    name,
    description,
    imageUrl,
    condition,
    categories,
    ownedBy,
    rentedBy,
    available,
  } = req.body;

  Equipment.create({
    name,
    description,
    imageUrl,
    condition,
    categories,
    ownedBy,
    rentedBy,
    available,
  })
    .then((createdEquipement) => {
      res.status(201).json(createdEquipement);
    })
    .catch((err) => {
      next(err);
    });
});

router.put("/:equipmentId", (req, res, next) => {
  const { equipmentId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(equipmentId)) {
    res.status(400).json({ message: `Specified id is not valid` });
  }

  Equipment.findByIdAndUpdate(equipmentId, req.body, { new: true })
    .then((updatedEquipment) => {
      res.status(200).json(updatedEquipment);
    })
    .catch((err) => next(err));
});

router.delete("/:equipmentId", (req, res, next) => {
  const { equipmentId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(equipmentId)) {
    res.status(400).json({ message: `Specified id is not valid` });
  }

  const id = equipmentId;
  Request.find({ equipmentId: `${id}` })
    .then((foundRequests) => {
      foundRequests.forEach((request) => {
        Request.findByIdAndRemove(request._id)
        .then(() => {console.log(ok)})
        .catch((err) => {next(err)});
      });
    })
    .then(
      Equipment.findByIdAndRemove(equipmentId)
        .then(() => {
          res.status(200).json({
            message: `Equipment with ${equipmentId} has beeen deleted successfully`,
          });
        })
        .catch((err) => {
          next(err);
        })
    )
    .catch((error) => next(error));
});

module.exports = router;