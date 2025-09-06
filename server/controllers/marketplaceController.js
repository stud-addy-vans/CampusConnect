// server/controllers/marketplaceController.js

import MarketplaceItem from '../models/MarketplaceItem.js';

// @desc    Create a new item listing
// @route   POST /api/marketplace
export const createItem = async (req, res) => {
    try {
        const { title, description, price, category } = req.body;

        // Get the seller's ID from the authenticated user (attached by the 'protect' middleware)
        const seller = req.user._id;

        const newItem = new MarketplaceItem({
            title,
            description,
            price,
            category,
            seller,
        });

        const createdItem = await newItem.save();
        res.status(201).json(createdItem);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Get all item listings
// @route   GET /api/marketplace
export const getItems = async (req, res) => {
    try {
        // Find all items and populate the 'seller' field with their username
        const items = await MarketplaceItem.find({})
            .sort({ createdAt: -1 }) // Show newest items first
            .populate('seller', 'username');

        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};