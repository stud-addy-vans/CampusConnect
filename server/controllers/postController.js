// server/controllers/postController.js

import Post from '../models/Post.js';
import Reply from '../models/Reply.js';

// @desc    Create a new forum post
export const createPost = async (req, res) => {
    try {
        const { title, content, category } = req.body;
        const author = req.user._id;

        const newPost = new Post({ title, content, category, author });
        const savedPost = await newPost.save();
        res.status(201).json(savedPost);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Get all forum posts
export const getPosts = async (req, res) => {
    try {
        const posts = await Post.find({})
            .sort({ createdAt: -1 })
            .populate('author', 'username');
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Get a single post by ID with its replies
export const getPostById = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
            .populate('author', 'username')
            .populate({
                path: 'replies',
                populate: {
                    path: 'author',
                    select: 'username',
                },
            });

        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Add a reply to a post
export const addReply = async (req, res) => {
    try {
        const { content } = req.body;
        const author = req.user._id;
        const post = req.params.id;

        const newReply = new Reply({ content, author, post });
        const savedReply = await newReply.save();

        // Add the reply's ID to the post's replies array
        await Post.findByIdAndUpdate(post, { $push: { replies: savedReply._id } });

        res.status(201).json(savedReply);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};