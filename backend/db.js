const mysql = require('mysql2/promise');


const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'Fashion_feed'
});

module.exports = pool;
