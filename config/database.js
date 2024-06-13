const mysql = require("mysql2/promise");
const dotenv = require("dotenv");

dotenv.config();
// Create a connection pool
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: process.env.DB_NAME,
  connectionLimit: 10,
  timezone: "+01:00", // Set the timezone to Tunisia
  dateStrings: true, // Get dates as strings to preserve timestamps
});

async function executeQuery(query, params) {
  let connection;
  try {
    connection = await pool.getConnection();
    const sql = connection.format(query, params);
    if (process.env.QUERY_LOG === "true") {
      console.log("executed query: ", sql);
      console.log("****************");
      console.log("****************");
    }
    const [result] = await connection.query(sql);
    return result;
  } catch (error) {
    if (process.env.QUERY_LOG === "true") {
      console.error("error executing query: ", error.message);
    }
    throw error;
  } finally {
    if (connection) {
      connection.release();
    }
  }
}


module.exports = {
  executeQuery
};