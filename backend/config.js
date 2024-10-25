const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'cms-meow-db.mysql.database.azure.com',
  user: 'meowhost',
  password: 'cmscms@123',
  database: 'catering_system',
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err.message);
    return;
  }
  console.log('Connected to the MySQL database');
});

module.exports = { db };
