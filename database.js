
const mysql = require('mysql2')
const dotenv = require('dotenv')
dotenv.config()

// const pool = mysql.createPool({
//     host: process.env.MYSQL_HOST,
//     user: process.env.MYSQL_USER,
//     password: process.env.MYSQL_PASSWORD,
//     database: process.env.MYSQL_DATABASE
// }).promise()


// get all users database //
// async function getUsers(){
//     const [rows] = await pool.query("SELECT * FROM users")
//     console.log(rows)
//     return rows
// }