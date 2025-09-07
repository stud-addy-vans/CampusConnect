// server/models/Post.js

import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    content: {
        type: String,
        required: true,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    replies: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Reply',
    }],
    category: {
        type: String,
        required: true,
        enum: ['Academics', 'Clubs', 'General', 'Hostel Life'],
    },
}, { timestamps: true });

const Post = mongoose.model('Post', postSchema);

export default Post;