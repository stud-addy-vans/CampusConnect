// server/routes/events.js

import express from 'express';
import { protect } from '../middleware/authMiddleware.js'; // <-- Import middleware
// We will create these controller functions in the next step
import { createEvent, getEvents } from '../controllers/eventController.js';

const router = express.Router();

// Protect the POST route - only logged-in users can create events
router.post('/', protect, createEvent);

// Get all events - this can be public
router.get('/', getEvents);

// We will add the other routes later
// router.get('/:id', getSingleEvent);
// router.put('/:id', protect, updateEvent);
// router.delete('/:id', protect, deleteEvent);

export default router;