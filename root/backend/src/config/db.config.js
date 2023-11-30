export default {
  development: {
    database: process.env.DATABASE || "adopet",
    username: process.env.DB_USERNAME || "root",
    password: process.env.DB_PASSWORD || "root",
    host: process.env.DB_HOST || "127.0.0.1",
    dialect: "mysql",
    operatorsAliases: 0,
    define: {
      freezeTableName: true,
    },
  },
};
