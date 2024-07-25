const mysql = require('mysql2/promise');

<<<<<<< HEAD

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'Fashion_feed'
});

=======
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'Fashion_feed',
});

pool.getConnection((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the MySQL database.');
});

>>>>>>> a20424828c47dd1044ea3bc27cf096b72119299f
module.exports = pool;
