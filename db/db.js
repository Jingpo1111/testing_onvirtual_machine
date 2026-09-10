require('dotenv').config(); // Load environment variables from a .env fil
const { Connection } = require('mysql2');
const mysql = require('mysql2/promise');
const db = mysql.createPool({
    host: process.env.DB_HOST||localhost,
    user: process.env.DB_USER ||root,
    password: process.env.DB_PASSWORD|| 151006,
    database: process.env.DB_NAME|| user
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
