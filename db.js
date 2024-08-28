import { Sequelize } from "sequelize";
import TokenBlacklistModel from "./src/models/TokenBlacklis.js";
import UserModel from "./src/models/User.js";
import UserRolesModel from "./src/models/UserRoles.js";

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./dev_database.sqlite3",
  logging: false,
});

const injectedModels = {
  User: UserModel(sequelize),
  TokenBlacklist: TokenBlacklistModel(sequelize),
  UserRoles: UserRolesModel(sequelize),
};

for (let model in injectedModels) {
  const associate = injectedModels[model]?.prototype?.associate;
  if (typeof associate === "function") {
    associate(injectedModels);
  }
}

export { sequelize as default, injectedModels };
