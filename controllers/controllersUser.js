import pool from '../db.js';

// Get all users
export const getUsers = async (req, res) => {
    try {
        const [users] = await pool.query('SELECT * FROM users');
        res.status(200).json({ success: true, data: users });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Create a new user
export const createUser = async (req, res) => {
    const { name, email } = req.body;

    if (!name || !email) {
        return res.status(400).json({ success: false, message: 'Name and email are required' });
    }

    try {
        const [result] = await pool.query('INSERT INTO users (name, email) VALUES (?, ?)', [name, email]);
        res.status(201).json({ success: true, message: 'User created', userId: result.insertId });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
