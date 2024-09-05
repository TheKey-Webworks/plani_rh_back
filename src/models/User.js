import { DataTypes, Model, Sequelize } from "sequelize";

export default function UserModel(sequelize) {
  class User extends Model {
    associate(models) {
      User.belongsTo(models?.UserRoles);
    }
  }
  User.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        unique: true,
        primaryKey: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      password: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: true,
        },
      },
    },
    { sequelize, modelName: "Users" }
  );

  return User;
}
