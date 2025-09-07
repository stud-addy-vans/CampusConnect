// server/index.js

import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import { Server } from 'socket.io';
import http from 'http';
import jwt from 'jsonwebtoken'; // Import jwt

// ... import all your routes ...
import authRoutes from './routes/auth.js';
import eventRoutes from './routes/events.js';
import marketplaceRoutes from './routes/marketplace.js';
import rideRoutes from './routes/rides.js';
import postRoutes from './routes/posts.js';
import messageRoutes from './routes/messages.js';
import userRoutes from './routes/users.js';

dotenv.config();
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: ["http://localhost:5173"],
        methods: ["GET", "POST"],
    },
});

app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/marketplace', marketplaceRoutes);
app.use('/api/rides', rideRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/users', userRoutes);

// --- SECURE SOCKET.IO LOGIC ---
const userSocketMap = {}; // Maps userId to socketId

// Middleware to authenticate socket connections
io.use((socket, next) => {
    const token = socket.handshake.auth.token;
    if (!token) {
        return next(new Error("Authentication error"));
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return next(new Error("Authentication error"));
        socket.decoded = decoded; // Attach user info to the socket
        next();
    });
});

io.on('connection', (socket) => {
    const userId = socket.decoded.id;
    console.log('a user connected:', userId, 'with socketId:', socket.id);
    userSocketMap[userId] = socket.id;

    socket.on("sendMessage", ({ receiverId, message }) => {
        const receiverSocketId = userSocketMap[receiverId];
        if (receiverSocketId) {
            io.to(receiverSocketId).emit("newMessage", { senderId: userId, message });
        }
    });

    socket.on('disconnect', () => {
        console.log('user disconnected:', userId);
        delete userSocketMap[userId];
    });
});

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI, {})
    .then(() => {
        server.listen(PORT, () => console.log(`✅ Server with Socket.IO running on port: ${PORT}`));
    })
    .catch((error) => {
        console.error(`❌ Error connecting to MongoDB: ${error.message}`);
    });

app.get('/', (req, res) => {
    res.send('CampusConnect API is running!');
});