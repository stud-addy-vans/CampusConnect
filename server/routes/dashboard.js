// server/routes/dashboard.js

import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { getDashboardStats } from '../controllers/dashboardController.js';

const router = express.Router();

// This route is protected, only logged-in users can see dashboard stats
router.get('/stats', protect, getDashboardStats);

export default router;