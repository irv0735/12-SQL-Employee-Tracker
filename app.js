const express = require('express');
const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');
require('dotenv').config();

const PORT = process.env.PORT;
const app = express();

const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: process.env.MYSQL_PW,
    database: 'company_db'
  },
  console.log('Connected to the company_db database.')
);



app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});