const User = require('../models/User.model');
const express = require('express');
const router = express.Router();
const fileUploader = require("../middlewares/cloudinary.config");

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

router.put("/upload/:id", fileUploader.single("imageUrl"), async (req, res, next) => {
    const userId = req.params.id;
    const updatedUser = {
        firstName:req.body.firstName,lastName:req.body.lastName, email:req.body.email
    }

    
    if(req.file){
        updatedUser.imageUrl=req.file.path;
    }
    console.log(updatedUser);
    try {
        
        const user = await User.findById(userId);

        if (!user) {
            console.log("user not found")
            return res.status(404).json({ error: 'User not found' });
            
        }
       const response = await User.findByIdAndUpdate(userId, updatedUser, {new:true})
       console.log(response);
       

        

      
  

        res.status(200).json(response);
    } catch (err) {
        console.log(err);
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
