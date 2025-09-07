// server/controllers/rideController.js

import Ride from '../models/Ride.js';

// @desc    Create a new ride offer
// @route   POST /api/rides
export const createRide = async (req, res) => {
    try {
        const { origin, destination, date, seatsAvailable } = req.body;

        // Get the driver's ID from the authenticated user (attached by the 'protect' middleware)
        const driver = req.user._id;

        const newRide = new Ride({
            origin,
            destination,
            date,
            seatsAvailable,
            driver,
        });

        const createdRide = await newRide.save();
        res.status(201).json(createdRide);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Get all ride offers
// @route   GET /api/rides
export const getRides = async (req, res) => {
    try {
        // Find all rides and populate the 'driver' field with their username
        const rides = await Ride.find({})
            .sort({ date: 1 }) // Show rides with the soonest date first
            .populate('driver', 'username');

        res.status(200).json(rides);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};