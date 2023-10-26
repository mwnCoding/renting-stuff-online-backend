const Comments = require('../models/Comments.model');
const mongoose = require('mongoose');
const router = require('express').Router();

//Get all comments made for the user with the passed ID
router.get('/:userId', (request, response, next) => {
    
})