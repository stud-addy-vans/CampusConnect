// server/index.js

import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

// Import route files
import authRoutes from './routes/auth.js';
import eventRoutes from './routes/events.js';
import marketplaceRoutes from './routes/marketplace.js';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);

app.use('/api/marketplace', marketplaceRoutes);

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI, {})
    .then(() => {
        app.listen(PORT, () => console.log(`✅ Server running on port: ${PORT}`));
    })
    .catch((error) => {
        console.error(`❌ Error connecting to MongoDB: ${error.message}`);
    });

app.get('/', (req, res) => {
    res.send('CampusConnect API is running!');
});