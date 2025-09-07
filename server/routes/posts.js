// server/routes/posts.js

import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import {
    createPost,
    getPosts,
    getPostById,
    addReply,
} from '../controllers/postController.js';

const router = express.Router();

router.route('/').post(protect, createPost).get(protect, getPosts);
router.route('/:id').get(protect, getPostById);
router.route('/:id/replies').post(protect, addReply);

export default router;