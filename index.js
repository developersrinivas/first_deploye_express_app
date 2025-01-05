import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/routeUser.js';

dotenv.config(); // Load environment variables from .env file

const app = express();
app.use(express.json()); // Middleware to parse JSON

// User Routes
app.use('/users', userRoutes);

// Start the Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => console.log(`Server running on port ${PORT}`));
