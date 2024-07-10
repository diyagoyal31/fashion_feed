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

// Login route
app.post('/login', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }

    db.query('SELECT * FROM Users WHERE Email = ?', [email], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Database query error' });
        }

        if (results.length === 0) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const user = results[0];

        bcrypt.compare(password, user.Password, (err, isMatch) => {
            if (err) {
                return res.status(500).json({ error: 'Password comparison error' });
            }

            if (!isMatch) {
                return res.status(401).json({ error: 'Invalid email or password' });
            }

            res.json({ message: 'Login successful', userID: user.UserID });
        });
    });
});

// Fetch user details route
app.get('/user/:id', (req, res) => {
    const userID = req.params.id;

    db.query('SELECT * FROM Users WHERE UserID = ?', [userID], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Database query error' });
        }

        if (results.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json(results[0]);
    });
});

// Update user profile route
app.put('/user/:id', (req, res) => {
    const userID = req.params.id;
    const { name, phone, address, dateOfBirth, gender } = req.body;

    const updatedUser = {
        Name: name,
        Phone: phone,
        Address: address,
        DateOfBirth: dateOfBirth,
        Gender: gender
    };

    db.query('UPDATE Users SET ? WHERE UserID = ?', [updatedUser, userID], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Database update error' });
        }

        res.json({ message: 'User profile updated successfully' });
    });
});

// Fetch all categories
app.get('/categories', (req, res) => {
    db.query('SELECT * FROM Categories', (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Database query error' });
        }

        res.json(results);
    });
});

// Add a new category
app.post('/categories', (req, res) => {
    const { categoryName, description } = req.body;

    const newCategory = {
        CategoryName: categoryName,
        Description: description
    };

    db.query('INSERT INTO Categories SET ?', newCategory, (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Database insertion error' });
        }

        res.status(201).json({ message: 'Category added successfully', categoryID: result.insertId });
    });
});
// Fetch all brands
app.get('/brands', (req, res) => {
    db.query('SELECT * FROM Brands', (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Database query error' });
        }

        res.json(results);
    });
});

// Add a new brand
app.post('/brands', (req, res) => {
    const { BrandName, Type } = req.body;

    const newBrand = {
        BrandName: BrandName,
        Type: Type
    };

    db.query('INSERT INTO Brands SET ?', newBrand, (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Database insertion error' });
        }

        res.status(201).json({ message: 'Brand added successfully', brandID: result.insertId });
    });
});
// Fetch all products
app.get('/products', (req, res) => {
    db.query('SELECT * FROM Products', (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Database query error' });
        }

        res.json(results);
    });
});

// Add a new product
// Add a new product
app.post('/products', (req, res) => {
    const { productName, categoryID, brandID, price, description, size, stockQuantity, image } = req.body;

    if (!productName || !price) {
        return res.status(400).json({ error: 'Product name and price are required' });
    }

    const newProduct = {
        ProductName: productName,
        CategoryID: categoryID,
        BrandID: brandID,
        Price: price,
        Description: description,
        Size: size,
        StockQuantity: stockQuantity,
        Image: image
    };

    db.query('INSERT INTO Products SET ?', newProduct, (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Database insertion error' });
        }

        res.status(201).json({ message: 'Product added successfully', productID: result.insertId });
    });
});


// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
