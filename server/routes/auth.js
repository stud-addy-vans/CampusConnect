// server/routes/auth.js

import express from 'express';
import { register, login } from '../controllers/authController.js'; // Import the register function

const router = express.Router();

// @route   POST api/auth/register
// @desc    Register a new user
router.post('/register', register); // Use the register controller

// @route   POST api/auth/login
// @desc    Authenticate user & get token
router.post('/login', login); // Use the login controller

export default router;