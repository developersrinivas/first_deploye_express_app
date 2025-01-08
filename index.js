import express from 'express';
import dotenv from 'dotenv';
import routes from './routes/routeUser.js';
import cors from 'cors';

dotenv.config(); // Load environment variables from .env file

const app = express();

// CORS Configuration
const corsOptions = {
  origin: '*', // Allow all origins (you can specify domains here)
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow specific HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allow specific headers
  credentials: true, // Enable cookies and credentials (if needed)
};

// Use CORS Middleware
app.use(cors(corsOptions));

// Middleware to parse JSON
app.use(express.json());

// User Routes
app.use('/ecl', routes);

// Start the Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => console.log(`Server running on port ${PORT}`));
