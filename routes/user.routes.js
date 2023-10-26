const User = require('../models/User.model');
const express = require('express');
const router = express.Router();
const fileUploader = require("../config/cloudinary.config");

router.get('/:userId', async (req, res) => {
    const { userId } = req.params;
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: 'An error occurred while fetching the user.' });
    }
});

router.post("/upload", fileUploader.single("imageUrl"), async (req, res, next) => {
    if (!req.file) {
        return res.status(400).json({ error: "No file uploaded!" });
    }
    const userData = req.body;
    try {
        const user = new User({
            imageUrl: req.file.path, 
        });
        await user.save();
        res.status(201).json(user);
    } catch (err) {
        // Pass the error to the error handling middleware using `next`
        next(err);
    }
});

// Update an existing user
router.put('/:id', async (req, res) => {
    const userId = req.params.id;
    const updatedUserData = req.body;

    try {
        const user = await User.findByIdAndUpdate(userId, updatedUserData, { new: true });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json(user);
    } catch (err) {
        res.status(500).json({ error: 'User update failed.' });
    }
});

module.exports = router;
