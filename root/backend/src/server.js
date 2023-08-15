const express = require('express')
const router = require('./routes/index.js')
//import  sequelize  from "./database/models/index.js";
const { sequelize } = require("./database/models");

const app = express();
const port = 8000;

app.use("/", router);

const connectDb = async () => {
  console.log("Checking databse conneciotn...");

  try {
    await sequelize.authenticate();
    console.log("Database connection established.");
  } catch (error) {
    console.log("Databse connection failed", error);
    process.exit(1);
  }
};

(async () => {
  await connectDb();

  console.log(`Attempinh to run server on port ${port}`);

  app.listen(port, () => console.log(`Servidor está rodando na porta ${port}`));
})();

