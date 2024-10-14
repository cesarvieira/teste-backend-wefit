import 'dotenv/config';
import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: process.env.MYSQLDB_HOST,
  port: parseInt(process.env.MYSQLDB_PORT || '3306'),
  user: process.env.MYSQLDB_USER,
  password: process.env.MYSQLDB_PASSWORD,
  database: process.env.MYSQLDB_DATABASE,
});

const run = async () => {
  try {
    const conn = await pool.getConnection();
    /* 
    document is unique, so we can't have two people with the same document
    */
    await conn.query(`CREATE TABLE IF NOT EXISTS people (
      id INT AUTO_INCREMENT PRIMARY KEY,
      personType ENUM('PF', 'PJ') NOT NULL,
      document VARCHAR(14) NOT NULL UNIQUE,
      doc_responsible VARCHAR(11),
      name VARCHAR(255) NOT NULL,
      cellphone VARCHAR(11) NULL,
      phone VARCHAR(11) NULL,
      email VARCHAR(255) NOT NULL,
      address_zip VARCHAR(8) NOT NULL,
      address_street VARCHAR(255) NOT NULL,
      address_number VARCHAR(10) NOT NULL,
      address_complement VARCHAR(255) NULL,
      address_neighborhood VARCHAR(255) NOT NULL,
      address_city VARCHAR(255) NOT NULL,
      address_state CHAR(2) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )`);
    conn.release();
  } catch (error) {
    console.error('Error on create table', error);
  }

  pool.end();

  console.log('Migration finished');

  process.exit(0);
}

run();
