const mysql = require('mysql2/promise');


const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'nidhi3006',
    database: 'myntra'
});

module.exports = pool;
