// server/routes/chatbot.js

import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { chatWithBot } from '../controllers/chatbotController.js';

const router = express.Router();

// protect this route so only logged-in users can use the bot
router.post('/', protect, chatWithBot);

export default router;