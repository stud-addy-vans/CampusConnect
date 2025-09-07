// server/routes/messages.js

import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { getMessages, sendMessage } from '../controllers/messageController.js';

const router = express.Router();

router.get('/:id', protect, getMessages);
router.post('/send/:id', protect, sendMessage);

export default router;