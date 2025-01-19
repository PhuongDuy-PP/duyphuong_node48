import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

// load biến môi trường từ file .env
dotenv.config();

// khởi tạo connection
const connect = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT
});

// export connection
export default connect;