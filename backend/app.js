// Import required modules
const express = require('express');
const mysql = require('mysql');

// Create an Express application
const app = express();
const port = 3000; // Port number for your server

// MySQL Connection
const connection = mysql.createConnection({
    host: 'localhost', // MySQL host
    user: 'root', // MySQL username
    password: 'your_password', // MySQL password
    database: 'your_database' // MySQL database name
});

// Connect to MySQL
connection.connect(err => {
    if (err) {
        console.error('Error connecting to MySQL: ' + err.stack);
        return;
    }
    console.log('Connected to MySQL as id ' + connection.threadId);
});

// Middleware to parse JSON requests
app.use(express.json());

// Error handler middleware
function errorHandler(err, req, res, next) {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
}

// Users API Endpoints

// Signup: Create a new user
app.post('/api/users/signup', (req, res, next) => {
    const { Name, Email, Password, Phone, Address, DateOfBirth, Gender } = req.body;
    const newUser = { Name, Email, Password, Phone, Address, DateOfBirth, Gender };
    connection.query('INSERT INTO Users SET ?', newUser, (error, results) => {
        if (error) {
            return next(error);
        }
        res.status(201).json({ message: 'User created successfully', userID: results.insertId });
    });
});

// Login: Authenticate and login a user
app.post('/api/users/login', (req, res, next) => {
    const { Email, Password } = req.body;
    connection.query('SELECT * FROM Users WHERE Email = ? AND Password = ?', [Email, Password], (error, results) => {
        if (error) {
            return next(error);
        }
        if (results.length === 0) {
            res.status(401).json({ error: 'Invalid credentials' });
            return;
        }
        // For simplicity, you may generate a JWT token here for authentication
        res.json({ message: 'Login successful', user: results[0] });
    });
});

// User Profile: Retrieve user profile information
app.get('/api/users/:userID', (req, res, next) => {
    const userID = req.params.userID;
    connection.query('SELECT * FROM Users WHERE UserID = ?', [userID], (error, results) => {
        if (error) {
            return next(error);
        }
        if (results.length === 0) {
            res.status(404).json({ error: 'User not found' });
            return;
        }
        res.json(results[0]);
    });
});

// Update user profile information
app.put('/api/users/:userID', (req, res, next) => {
    const userID = req.params.userID;
    const updatedUser = req.body;
    connection.query('UPDATE Users SET ? WHERE UserID = ?', [updatedUser, userID], (error, results) => {
        if (error) {
            return next(error);
        }
        if (results.affectedRows === 0) {
            res.status(404).json({ error: 'User not found' });
            return;
        }
        res.json({ message: 'User updated successfully' });
    });
});

// Delete user account (optional)
app.delete('/api/users/:userID', (req, res, next) => {
    const userID = req.params.userID;
    connection.query('DELETE FROM Users WHERE UserID = ?', [userID], (error, results) => {
        if (error) {
            return next(error);
        }
        if (results.affectedRows === 0) {
            res.status(404).json({ error: 'User not found' });
            return;
        }
        res.json({ message: 'User deleted successfully' });
    });
});

// Products API Endpoints

// Product Listing: Get a list of all products
app.get('/api/products', (req, res, next) => {
    connection.query('SELECT * FROM Products', (error, results) => {
        if (error) {
            return next(error);
        }
        res.json(results);
    });
});

// Get details of a specific product
app.get('/api/products/:productID', (req, res, next) => {
    const productID = req.params.productID;
    connection.query('SELECT * FROM Products WHERE ProductID = ?', [productID], (error, results) => {
        if (error) {
            return next(error);
        }
        if (results.length === 0) {
            res.status(404).json({ error: 'Product not found' });
            return;
        }
        res.json(results[0]);
    });
});

// Product Search: Search products by keyword
app.get('/api/products/search', (req, res, next) => {
    const { query } = req.query;
    connection.query('SELECT * FROM Products WHERE ProductName LIKE ?', [`%${query}%`], (error, results) => {
        if (error) {
            return next(error);
        }
        res.json(results);
    });
});

// Categories API Endpoints

// Categories Listing: Get a list of all categories
app.get('/api/categories', (req, res, next) => {
    connection.query('SELECT * FROM Categories', (error, results) => {
        if (error) {
            return next(error);
        }
        res.json(results);
    });
});

// Get details of a specific category
app.get('/api/categories/:categoryID', (req, res, next) => {
    const categoryID = req.params.categoryID;
    connection.query('SELECT * FROM Categories WHERE CategoryID = ?', [categoryID], (error, results) => {
        if (error) {
            return next(error);
        }
        if (results.length === 0) {
            res.status(404).json({ error: 'Category not found' });
            return;
        }
        res.json(results[0]);
    });
});

// Brands API Endpoints

// Brands Listing: Get a list of all brands
app.get('/api/brands', (req, res, next) => {
    connection.query('SELECT * FROM Brands', (error, results) => {
        if (error) {
            return next(error);
        }
        res.json(results);
    });
});

// Get details of a specific brand
app.get('/api/brands/:brandID', (req, res, next) => {
    const brandID = req.params.brandID;
    connection.query('SELECT * FROM Brands WHERE BrandID = ?', [brandID], (error, results) => {
        if (error) {
            return next(error);
        }
        if (results.length === 0) {
            res.status(404).json({ error: 'Brand not found' });
            return;
        }
        res.json(results[0]);
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

// Error handler middleware
app.use(errorHandler);
