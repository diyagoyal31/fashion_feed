const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const db = require('./db');
const cors = require('cors');
const app = express();

app.use(bodyParser.json());
app.use(cors({
  origin: 'http://localhost:3000' // Replace with your frontend URL
}));

// Define the signup route
app.post('/signup', async (req, res) => {
  const { Name, Email, Password, Phone, Address, DateOfBirth, Gender } = req.body;

  // Input validation (you can add more validations as needed)
  if (!Name || !Email || !Password) {
    return res.status(400).json({ message: 'Name, Email, and Password are required.' });
  }

  try {
    // Check if the user already exists
    const [existingUser] = await db.query('SELECT Email FROM Users WHERE Email = ?', [Email]);
    if (existingUser.length > 0) {
      return res.status(400).json({ message: 'Email already in use.' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(Password, 10);

    // Insert the new user into the database
    await db.query(
      'INSERT INTO Users (Name, Email, Password, Phone, Address, DateOfBirth, Gender) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [Name, Email, hashedPassword, Phone, Address, DateOfBirth, Gender]
    );

    res.status(201).json({ message: 'User registered successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

// Login route
app.post('/login', async (req, res) => {
  const { Email, Password } = req.body;

  if (!Email || !Password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }

  try {
    const [results] = await db.query('SELECT * FROM Users WHERE Email = ?', [Email]);
    if (results.length === 0) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    const user = results[0];

    const isMatch = await bcrypt.compare(Password, user.Password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    res.json({ message: 'Login successful', userID: user.UserID });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

// Fetch user details route
app.get('/user/:id', async (req, res) => {
  const userID = req.params.id;

  try {
    const [results] = await db.query('SELECT * FROM Users WHERE UserID = ?', [userID]);
    if (results.length === 0) {
      return res.status(404).json({ message: 'User not found.' });
    }

    res.json(results[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

// Update user profile route
app.put('/user/:id', async (req, res) => {
  const userID = req.params.id;
  const { Name, Phone, Address, DateOfBirth, Gender } = req.body;

  const updatedUser = {
    Name,
    Phone,
    Address,
    DateOfBirth,
    Gender,
  };

  try {
    await db.query('UPDATE Users SET ? WHERE UserID = ?', [updatedUser, userID]);
    res.json({ message: 'User profile updated successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

// Fetch all categories
app.get('/categories', async (req, res) => {
  try {
    const [results] = await db.query('SELECT * FROM Categories');
    res.json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

// Add a new category
app.post('/categories', async (req, res) => {
  const { CategoryName, Description } = req.body;

  const newCategory = {
    CategoryName,
    Description,
  };

  try {
    const [result] = await db.query('INSERT INTO Categories SET ?', newCategory);
    res.status(201).json({ message: 'Category added successfully', categoryID: result.insertId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

// Fetch all brands
app.get('/brands', async (req, res) => {
  try {
    const [results] = await db.query('SELECT * FROM Brands');
    res.json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

// Add a new brand
app.post('/brands', async (req, res) => {
  const { BrandName, Type } = req.body;

  if (!BrandName || !Type) {
    return res.status(400).json({ message: 'BrandName and Type are required.' });
  }

  const newBrand = {
    BrandName,
    Type,
  };

  try {
    const [result] = await db.query('INSERT INTO Brands SET ?', newBrand);
    res.status(201).json({ message: 'Brand added successfully', brandID: result.insertId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

// Fetch all products
app.get('/products', async (req, res) => {
  try {
    const [results] = await db.query('SELECT * FROM Products');
    res.json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

// Add a new product
app.post('/products', async (req, res) => {
  const { ProductName, CategoryID, BrandID, Price, Description, Size, StockQuantity, Image } = req.body;

  if (!ProductName || !Price) {
    return res.status(400).json({ message: 'Product name and price are required.' });
  }

  const newProduct = {
    ProductName,
    CategoryID,
    BrandID,
    Price,
    Description,
    Size,
    StockQuantity,
    Image,
  };

  try {
    const [result] = await db.query('INSERT INTO Products SET ?', newProduct);
    res.status(201).json({ message: 'Product added successfully', productID: result.insertId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
