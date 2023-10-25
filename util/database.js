const mysql = require("mysql2");


// Create a connection pool

const pool = mysql.createPool({
    // host : 'localhost',
    host : '45.55.136.114',
    user : 'F2023_amusielak01',
    // database : 'node-complete',
    database : 'F2023_amusielak0',
    password: "PrarieD0g23!"
});

module.exports = pool.promise();