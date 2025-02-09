import { Sequelize } from "sequelize";
import dotenv from "dotenv";

// load environment variables
dotenv.config();

console.log({
   DB_HOST: process.env.DB_HOST,
   DB_USERNAME: process.env.DB_USERNAME,
   DB_PASSWORD: process.env.DB_PASSWORD,
   DB_DATABASE: process.env.DB_DATABASE,
   DB_PORT: process.env.DB_PORT,
});

// create connection to database
const connect = new Sequelize(
   process.env.DB_DATABASE, // tên database
   process.env.DB_USERNAME, // username
   process.env.DB_PASSWORD, // password
   {
      host: process.env.DB_HOST,
      dialect: "mysql",
      port: process.env.DB_PORT,
      logging: false, // set true to see all SQL queries
   }
);

export default connect;
