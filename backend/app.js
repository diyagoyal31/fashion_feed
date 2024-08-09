const express = require('express');
const bcrypt = require('bcrypt');
const session = require('express-session');
const cors = require('cors');  // Import cors
const db = require('./db');  // Import the db connection

const app = express();
const port = 5000;

// Middleware
app.use(cors());  // Use cors middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: true,
}));

// Signup route
app.post('/api/signup', async (req, res) => {
  const { Name, Email, Password, Phone, Address, DateOfBirth, Gender } = req.body;

  if (!Name || !Email || !Password || !Phone || !Address || !DateOfBirth || !Gender) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    // Check if the email already exists
    db.query('SELECT * FROM Users WHERE Email = ?', [Email], async (err, results) => {
      if (err) throw err;

      if (results.length > 0) {
        return res.status(400).json({ message: 'Email already exists' });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(Password, 10);

      // Insert the user into the database
      db.query(
        'INSERT INTO Users (Name, Email, Password, Phone, Address, DateOfBirth, Gender) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [Name, Email, hashedPassword, Phone, Address, DateOfBirth, Gender],
        (err, result) => {
          if (err) throw err;

          // Set session storage
          req.session.user = {
            id: result.insertId,
            name: Name,
            email: Email,
          };

          res.status(201).json({ message: 'User registered successfully', user: req.session.user });
        }
      );
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});


app.post('/api/login', (req, res) => {
  const { Email, Password } = req.body;

  if (!Email || !Password) {
    return res.status(400).json({ message: 'Please fill in both fields.' });
  }

  // Query the user by email
  db.query('SELECT * FROM Users WHERE Email = ?', [Email], async (err, results) => {
    if (err) return res.status(500).json({ message: 'Database error' });

    if (results.length === 0) {
      return res.status(400).json({ message: 'Invalid email or password.' });
    }

    const user = results[0];

    // Compare the entered password with the stored hashed password
    const isMatch = await bcrypt.compare(Password, user.Password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password.' });
    }

    // Set session storage with additional user details
    req.session.user = {
      id: user.UserID,
      name: user.Name,
      email: user.Email,
      phone: user.Phone,
      address: user.Address,
      dateOfBirth: user.DateOfBirth,
      gender: user.Gender
    };

    res.status(200).json({ message: 'Login successful!', user: req.session.user });
  });
});

app.post('/api/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.status(500).json({ message: 'Logout failed.' });
    }
    res.status(200).json({ message: 'Logout successful.' });
  });
});


app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

