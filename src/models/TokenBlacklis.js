import { DataTypes, Model, Sequelize } from "sequelize";

export default function TokenBlacklistModel(sequelize) {
  class TokenBlacklist extends Model {}
  TokenBlacklist.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        unique: true,
        primaryKey: true,
      },

      token: {
        type: DataTypes.STRING,
      },
    },
    { sequelize, modelName: "TokenBlacklist" }
  );
  return TokenBlacklist;
}
