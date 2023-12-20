import dotenv from "dotenv";

dotenv.config();

export default {
  development: {
    database: process.env.DB_NAME || "adopet",
    username: process.env.DB_USER || "root",
    password: process.env.DB_PWD || "root",
    host: process.env.DB_HOST || "127.0.0.1",
    port: process.env.DB_PORT || 3306,
    dialect: "mysql",
    operatorsAliases: 0,
    define: {
      freezeTableName: true,
    },
  },
};
