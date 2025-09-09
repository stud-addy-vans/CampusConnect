// server/models/MarketplaceItem.js

import mongoose from 'mongoose';

const marketplaceItemSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        required: true,
        enum: ['Books', 'Electronics', 'Furniture', 'Other'],
    },
    imageUrl: {
        type: String,
        required: true,
    },
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User', // Reference to the User model
    },
}, { timestamps: true });

const MarketplaceItem = mongoose.model('MarketplaceItem', marketplaceItemSchema);

export default MarketplaceItem;