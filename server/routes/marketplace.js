// server/routes/marketplace.js

import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { createItem, getItems } from '../controllers/marketplaceController.js';

const router = express.Router();

// @route   POST api/marketplace
// @desc    Create a new item listing
router.post('/', protect, createItem); // <-- Use createItem controller

// @route   GET api/marketplace
// @desc    Get all item listings
router.get('/', getItems); // <-- Use getItems controller

// We will build the logic for these later
// @route   PUT api/marketplace/:id
router.put('/:id', protect, (req, res) => res.send('Update item route'));

// @route   DELETE api/marketplace/:id
router.delete('/:id', protect, (req, res) => res.send('Delete item route'));

export default router;