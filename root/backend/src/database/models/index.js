import fs from "fs";
import path from "path";
import Sequelize from "sequelize";
import { fileURLToPath, pathToFileURL } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
import configData from "../../config/db.config.js";

const config = configData[env];

const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

const modelPromises = fs
  .readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 &&
      file !== basename &&
      file.slice(-3) === ".js" &&
      file.indexOf(".test.js") === -1
    );
  })
  .map(async (file) => {
    const modelModule = await import(pathToFileURL(path.join(__dirname, file)));
    const model = modelModule.default(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Promise.all(modelPromises)
  .then(() => {
    Object.keys(db).forEach((modelName) => {
      if (db[modelName].associate) {
        db[modelName].associate(db);
      }
    });
  })
  .catch((error) => {
    console.error("Error loading and associating models:", error);
  });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
