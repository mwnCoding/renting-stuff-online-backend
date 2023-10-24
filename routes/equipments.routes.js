const Equipment = require('../models/Equipment.model');
const mongoose = require('mongoose');
const router = require('express').Router();

router.get('/', (req, res, next) => {
    Equipment.find({})
    .then((equipments) => {
        console.log(equipments)
        res.status(200).json(equipments)
    }).catch((err) => {
        console.log(err)
    })
})

router.get('/:equipmentId', (req, res, next) => {
    const { equipmentId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(equipmentId)){
        res.status(400).json({message: `Specified id is not valid`});
      }

    Equipment.findById(equipmentId)
    .then((foundEquipment) => {
        console.log(foundEquipment)
        res.status(200).json(foundEquipment)
    }).catch((err) => {
        console.log(err)
    })
})

router.post('/', (req, res, next) => {
    const { name, description, imageUrl, condition, OwnedBy, rentedBy, available } = req.body;

    Equipment.create({ name, description, imageUrl, condition, OwnedBy, rentedBy, available })
    .then((createdEquipement) => {
        res.status(201).json(createdEquipement)
    })
    .catch((err) =>{
        console.log(err)
    })
})

router.put('/:equipmentId', (req, res, next) => {
    const { equipmentId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(equipmentId)){
        res.status(400).json({message: `Specified id is not valid`});
      }

    Equipment.findByIdAndUpdate(equipmentId, req.body, {new: true})
    .then((updatedEquipment) => {
        req.status(200).json(updatedEquipment)
    })
    .catch((err) =>
        console.log(err)
    )
})

router.delete('/:equipmentId', (req, res, next) => {
    const { equipmentId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(equipmentId)){
        res.status(400).json({message: `Specified id is not valid`});
      }

    Equipment.findByIdAndRemove(equipmentId)
    .then(() => {
        req.status(200).json({message: `Equipment with ${equipmentId} has beeen deleted successfully`})
    })
    .catch((err) => {
        console.log(err)
    })
})

module.exports = router