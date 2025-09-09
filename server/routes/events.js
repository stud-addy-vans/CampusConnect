// server/routes/events.js

import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { authorize } from '../middleware/authorize.js';
import { createEvent, getEvents } from '../controllers/eventController.js';

const router = express.Router();

router.post('/', protect, authorize('admin', 'club_head'), createEvent);

// Get all events - THIS IS NOW PUBLIC FOR GUESTS
router.get('/', getEvents);

export default router;