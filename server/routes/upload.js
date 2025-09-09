// server/routes/upload.js
import express from 'express';
import { v2 as cloudinary } from 'cloudinary';
import upload from '../middleware/upload.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

router.post('/', protect, upload.single('image'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No image file uploaded.' });
        }

        const config = {
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET,
            resource_type: 'auto'
        };

        cloudinary.uploader.upload_stream(config, (error, result) => {
            if (error) {
                console.error('Cloudinary Error:', error);
                return res.status(500).json({ message: 'Cloudinary upload failed.' });
            }
            res.status(201).json({ imageUrl: result.secure_url });
        }).end(req.file.buffer);

    } catch (error) {
        console.error('Server Route Error:', error);

        res.status(500).json({ message: 'Server error during upload.' });
    }
});

export default router;