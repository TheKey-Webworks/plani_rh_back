import { DataTypes, Model, Sequelize } from "sequelize";

const permissionsDefault = {
  createUser: false,
  editUser: false,
  deleteUser: false,
  viewUser: false,
  createRole: false,
  editRole: false,
  deleteRole: false,
  assignRole: false,
  createPermission: false,
  editPermission: false,
  deletePermission: false,
  assignPermission: false,
  viewReports: false,
  generateReports: false,
  viewDashboard: false,
  manageSettings: false,
};

export default function UserRolesModel(sequelize) {
  class UserRoles extends Model {
    associate(models) {
      UserRoles.hasMany(models?.User);
    }
  }
  UserRoles.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        unique: true,
        primaryKey: true,
      },
      role: {
        type: DataTypes.STRING,
        defaultValue: "none",
        allowNull: false,
      },
      permissions: {
        type: DataTypes.JSON,
        allowNull: false,
        defaultValue: permissionsDefault,
        validate: {
          isValidPermissions(value) {
            const validKeys = [
              "createUser",
              "editUser",
              "deleteUser",
              "viewUser",
              "createRole",
              "editRole",
              "deleteRole",
              "assignRole",
              "createPermission",
              "editPermission",
              "deletePermission",
              "assignPermission",
              "viewReports",
              "generateReports",
              "viewDashboard",
              "manageSettings",
            ];

            const keys = Object.keys(value);

            keys.forEach((key) => {
              if (!validKeys.includes(key)) {
                console.log("hubo un error 1");
                throw new Error(`Invalid permission key: ${key}`);
              }
              if (typeof value[key] !== "boolean") {
                console.log("hubo un error 1");

                throw new Error(
                  `Permission value for ${key} should be a boolean.`
                );
              }
            });
          },
        },
      },
    },
    { sequelize, modelName: "UserRoles" }
  );

  return UserRoles;
}
