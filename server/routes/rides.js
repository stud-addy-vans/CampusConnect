// server/routes/rides.js

import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { createRide, getRides } from '../controllers/rideController.js';

const router = express.Router();

// @route   POST api/rides
// @desc    Create a new ride offer
router.post('/', protect, createRide); // <-- Use createRide controller

// @route   GET api/rides
// @desc    Get all ride offers
router.get('/', getRides); // <-- Use getRides controller

// We will build the logic for deleting later
// @route   DELETE api/rides/:id
router.delete('/:id', protect, (req, res) => res.send('Delete ride route'));

export default router;