import {Sequelize} from 'sequelize';
import dotenv from 'dotenv';

// load environment variables
dotenv.config();

// create connection to database
const connect = new Sequelize(
    process.env.DB_DATABASE, // tên database
    process.env.DB_USERNAME, // username
    process.env.DB_PASSWORD, // password
    {
        host: process.env.DB_HOST,
        dialect: 'mysql',
        port: process.env.DB_PORT
    }
)

export default connect;