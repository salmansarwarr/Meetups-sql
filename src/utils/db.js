import mysql2 from 'mysql2';

const connection = mysql2.createConnection({
    host: 'localhost',
    user: 'salman',
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

export default connection;
