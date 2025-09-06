// server/controllers/eventController.js

import Event from '../models/Event.js';

// @desc    Create a new event
// @route   POST /api/events
export const createEvent = async (req, res) => {
    try {
        const { title, description, date, location } = req.body;

        // The 'protect' middleware adds the user to the request object
        const createdBy = req.user._id;

        const event = new Event({
            title,
            description,
            date,
            location,
            createdBy,
        });

        const createdEvent = await event.save();
        res.status(201).json(createdEvent);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Get all events
// @route   GET /api/events
export const getEvents = async (req, res) => {
    try {
        // Find all events and sort them by date
        const events = await Event.find({}).sort({ date: 1 }).populate('createdBy', 'username email');
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};