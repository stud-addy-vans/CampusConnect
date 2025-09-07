// server/routes/users.js
import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import User from '../models/User.js';

const router = express.Router();

router.get('/', protect, async (req, res) => {
    try {
        const users = await User.find({ _id: { $ne: req.user._id } }).select('username');
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

export default router;