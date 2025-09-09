// server/routes/auth.js

import express from 'express';
import { registerAdmin, registerStudent, login } from '../controllers/authController.js';

const router = express.Router();

// The route now correctly points to the registerAdmin function
router.post('/register/student', registerStudent);
router.post('/register/admin', registerAdmin);
router.post('/login', login);

export default router;