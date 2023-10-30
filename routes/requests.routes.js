const Request = require('../models/Request.model');
const mongoose = require('mongoose');
const router = require('express').Router();


router.get('/' , (req, res, next) =>{
    Request.find(req.query)
    .populate('requesterId')
    .populate('ownerId')
    .populate('equipmentId')
    .then((requests) => {
        res.status(200).json(requests)
    }).catch((err) => {
        console.log(err)
    })
})

router.post('/', (req, res, next) => {
    const { requesterId, equipmentId, ownerId, requestMessage, responseMessage, startDate, endDate, status } = req.body
    Request.create({ requesterId, equipmentId, ownerId, requestMessage, responseMessage, startDate, endDate, status })
    .then((createdRequest) => {
        res.status(200).json(createdRequest)
    }).catch((err) => {
        console.log(err)
    })
})

router.get('/:requestId')

router.put('/:requestId')

router.delete('/:requestId')

module.exports = router