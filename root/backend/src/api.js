import express from "express";
import routes from "./routes/index.js";
import database from "./database/models/index.js";
import cors from "cors";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json({ limit: "6mb" }));
app.use("/", routes);

const connectDb = async () => {
  console.log("Checking databse conneciotn...");

  try {
    await database.sequelize.authenticate();
    console.log("Database connection established.");
  } catch (error) {
    console.log("Databse connection failed", error);
    process.exit(1);
  }
};

(async () => {
  await connectDb();

  console.log(`Attempted to run server on port ${port}`);

  app.listen(port, () => console.log(`Servidor está rodando na porta ${port}`));
})();
