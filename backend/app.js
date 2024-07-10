const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const db = require('./db');

const app = express();

app.use(bodyParser.json());

// Define the signup route
app.post('/signup', async (req, res) => {
    const { name, email, password, phone, address, dateOfBirth, gender } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ error: 'Name, email, and password are required' });
    }

    try {
        // Check if the email is already taken
        db.query('SELECT * FROM Users WHERE Email = ?', [email], async (err, results) => {
            if (err) {
                return res.status(500).json({ error: 'Database query error' });
            }

            if (results.length > 0) {
                return res.status(400).json({ error: 'Email already in use' });
            }

            // Hash the password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Insert the new user into the database
            const newUser = {
                Name: name,
                Email: email,
                Password: hashedPassword,
                Phone: phone,
                Address: address,
                DateOfBirth: dateOfBirth,
                Gender: gender
            };

            db.query('INSERT INTO Users SET ?', newUser, (err, result) => {
                if (err) {
                    return res.status(500).json({ error: 'Database insertion error' });
                }
                res.status(201).json({ message: 'User registered successfully', userID: result.insertId });
            });
        });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
