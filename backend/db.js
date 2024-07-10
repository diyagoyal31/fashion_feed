const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'your-database-host',
    user: 'your-database-username',
    password: 'your-database-password',
    database: 'your-database-name'
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the MySQL database.');
});

module.exports = connection;
