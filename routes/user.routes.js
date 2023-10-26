const User = require('../models/User.model');
const mongoose = require('mongoose');
const router = require('express').Router();
const express = require('express');



router.get('/:userId', async (req, res) => {
    const {userId} = req.params;
    try {
      const users = await User.findById(userId);
      res.json(users);
    } catch (err) {
      res.status(500).json({ error: 'An error occurred while fetching users.' });
    }
  });

router.post('/', async (req, res) => {
    const userData = req.body; 
    try {
      const user = await User.create(userData);
      res.status(201).json(user);
    } catch (err) {
      res.status(400).json({ error: 'User creation failed.' });
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