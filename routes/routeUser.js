import express from 'express';
import { getUsers, createUser } from '../controllers/controllersUser.js';

const router = express.Router();

router.get('/', getUsers); // Fetch all users
router.post('/post', createUser); // Add a new user

export default router;
