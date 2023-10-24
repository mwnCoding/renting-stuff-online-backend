const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User.model");

const router = express.Router();

router.post('/signup', async (request, response) => {
    const salt = bcrypt.genSaltSync(13);
    const passwordHash = bcrypt.hashSync(request.body.password, salt);

    try {
        const newUser = await User.create({...request.body, passwordHash});
        res.status(201).json(newUser);
    } catch (error) {
        console.log(error);
        response.status.(400).json(error);
    }
});