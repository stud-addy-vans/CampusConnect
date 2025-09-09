// server/controllers/dashboardController.js

import User from '../models/User.js';
import Event from '../models/Event.js';
import MarketplaceItem from '../models/MarketplaceItem.js';

export const getDashboardStats = async (req, res) => {
    try {
        // Run database queries in parallel for efficiency
        const [
            userCount,
            eventCount,
            itemCount,
            recentEvents,
            recentItems
        ] = await Promise.all([
            User.countDocuments(),
            Event.countDocuments(),
            MarketplaceItem.countDocuments(),
            Event.find().sort({ createdAt: -1 }).limit(3).populate('createdBy', 'username'),
            MarketplaceItem.find().sort({ createdAt: -1 }).limit(3).populate('seller', 'username')
        ]);

        res.status(200).json({
            userCount,
            eventCount,
            itemCount,
            recentEvents,
            recentItems,
        });

    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};