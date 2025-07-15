const express = require('express');
const siddu = express();

siddu.use(express.json());

// Dummy in-memory data
let users = [
    { id: 1, name: 'John Doe', email: 'john@example.com' }
];

// ROUTES

// ➤ GET: Read all users
siddu.get('/users', (req, res) => {
    res.json(users);
});

// ➤ POST: Create a new user
siddu.post("/save-us", (req, res) => {
    console.log("req came from postman");
    console.log(req.body);
    console.log("testing data is consoled above!!!!!!!!!!");
    const newUser = {
        id: users.length + 1,
        ...req.body
    };
    users.push(newUser);
    const response = res.status(202).json({
        message: "data is saved"
    });
});

// ➤ PUT: Update a user
siddu.put('/users/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = users.findIndex(user => user.id === id);

    if (index !== -1) {
        users[index] = { id, ...req.body };
        res.json(users[index]);
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});

// ➤ DELETE: Delete a user
siddu.delete('/delete-user/', (req, res) => {
    const userId = req.query.userId
    console.log(typeof (userId));
    const id = parseInt(userId);
    console.log(typeof (id));
    const initialLength = users.length;
    users = users.filter(user => user.id !== id);

    if (users.length < initialLength) {
        res.json({ message: 'User deleted successfully' });
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});

// ➤ Default route
siddu.get('/', (req, res) => {
    res.send('Hello from Backend!');
});

// Start server
const PORT = 7500;
siddu.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
