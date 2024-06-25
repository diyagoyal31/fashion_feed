// Import required modules
const mysql = require('mysql');

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

// Export the connection object
module.exports = connection;
