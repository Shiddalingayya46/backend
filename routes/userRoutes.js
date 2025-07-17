const express = require('express');
const router = express.Router();
const {
    createUser,
    getUsers,
    getUserById,
    updateUser,
    deleteUser
} = require('../controller/userController');

// Routes
router.post('/', createUser);         // Create
router.get('/', getUsers);            // Read all
router.get('/:id', getUserById);      // Read one
router.put('/:id', updateUser);       // Update
router.delete('/:id', deleteUser);    // Delete

module.exports = router;
