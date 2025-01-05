import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/routeUser.js';

dotenv.config();

const app = express();
app.use(express.json()); // Middleware to parse JSON

app.use('/users', userRoutes); // User routes
// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
