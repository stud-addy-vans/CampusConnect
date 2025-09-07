// server/models/Reply.js

import mongoose from 'mongoose';

const replySchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Post',
    },
}, { timestamps: true });

const Reply = mongoose.model('Reply', replySchema);

export default Reply;