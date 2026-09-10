require('dotenv').config(); // Load environment variables from a .env fil
const { Connection } = require('mysql2');
const mysql = require('mysql2/promise');
const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

db.getConnection()
    .then((connection) => {
        console.log('✅ Connected to the database');
        connection.release();
    })
    .catch((err) => {
        console.log('❌Error connecting to the database:', err.message);
    });


module.exports = db;