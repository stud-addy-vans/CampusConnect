// server/models/Ride.js

import mongoose from 'mongoose';

const rideSchema = new mongoose.Schema({
    origin: {
        type: String,
        required: true,
        trim: true,
    },
    destination: {
        type: String,
        required: true,
        trim: true,
    },
    date: {
        type: Date,
        required: true,
    },
    seatsAvailable: {
        type: Number,
        required: true,
        min: 1,
    },
    driver: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User', // Reference to the User model
    },
}, { timestamps: true });

const Ride = mongoose.model('Ride', rideSchema);

export default Ride;