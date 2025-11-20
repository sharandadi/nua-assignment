const mysql = require('mysql2/promise');

// Config using Environment Variables
const DB_CONFIG = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD, // Reads from .env
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

const DB_NAME = process.env.DB_NAME || 'user_management';

// 1. Create the Pool
const pool = mysql.createPool({
  ...DB_CONFIG,
  database: DB_NAME
});

// 2. Initialization Function
const initDB = async () => {
  try {
    const connection = await mysql.createConnection({
      host: DB_CONFIG.host,
      user: DB_CONFIG.user,
      password: DB_CONFIG.password
    });

    console.log(`🔧 Checking database '${DB_NAME}'...`);

    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\`;`);
    await connection.query(`USE \`${DB_NAME}\`;`);

    const createTableSQL = `
      CREATE TABLE IF NOT EXISTS users (
        uuid VARCHAR(36) PRIMARY KEY,
        name VARCHAR(100),
        email VARCHAR(100),
        city VARCHAR(100)
      );
    `;
    await connection.query(createTableSQL);

    console.log("✅ Database and Tables checked/created successfully.");
    await connection.end(); 

  } catch (error) {
    console.error("❌ Database Initialization Failed:", error.message);
    process.exit(1);
  }
};

module.exports = {
  pool,
  initDB
};