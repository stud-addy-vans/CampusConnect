// server/controllers/authController.js

import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const registerSchema = z.object({
    username: z.string().min(3, "Username must be at least 3 characters long"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
});

// @desc    Register a new user
export const register = async (req, res) => {
    try {
        // --- VALIDATE INPUT USING ZOD ---
        const validation = registerSchema.safeParse(req.body);
        if (!validation.success) {
            return res.status(400).json({ message: validation.error.errors[0].message });
        }

        const { username, email, password } = validation.data;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User with this email already exists' });
        }

        // Create new user
        const user = new User({ username, email, password });
        await user.save();

        // Create JWT
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

        res.status(201).json({ token, user: { id: user._id, username: user.username } });

    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Authenticate a user and get token
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1. Validate input
        if (!email || !password) {
            return res.status(400).json({ message: 'Please enter all fields' });
        }

        // 2. Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // 3. Compare the provided password with the stored hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // 4. If credentials are correct, create a new JWT
        const token = jwt.sign(
            { id: user._id, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        // 5. Send a successful response
        res.status(200).json({
            message: 'User logged in successfully',
            token,
            user: { id: user._id, username: user.username, email: user.email },
        });

    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};