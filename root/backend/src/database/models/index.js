import { Sequelize, DataTypes } from "sequelize";

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

import adopterModel from "./adopter.js";
import donorModel from "./donor.js";
import messageModel from "./message.js";
import petModel from "./pet.js";

const modelPromises = [
  adopterModel(sequelize, DataTypes),
  donorModel(sequelize, DataTypes),
  messageModel(sequelize, DataTypes),
  petModel(sequelize, DataTypes),
];

for (const model of modelPromises) {
  db[model.name] = model;
}

sequelize
  .sync()
  .then(() => {
    Object.keys(db).forEach((modelName) => {
      if (db[modelName].associate) {
        db[modelName].associate(db);
      }
    });
  })
  .catch((error) => {
    console.error("Error syncing and associating models:", error);
  });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
