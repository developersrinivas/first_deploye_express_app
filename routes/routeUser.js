import express from 'express';
import { getUsers, createUser,greetMessage,registersList,localData } from '../controllers/controllersUser.js';

const router = express.Router();

router.get('/users', getUsers); // Fetch all users
router.post('/registers', createUser); // Add a new user
router.get('/',greetMessage); // Fetch all users
router.get('/usersList', registersList); // Fetch all users

export default router;
