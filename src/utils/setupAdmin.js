import logger from "../config/winston.js";
import sequelize from "../../db.js";
import bcrypt from "bcrypt";
import { config } from "dotenv";

config();
const { SUPERADMIN_PASS, SUPERADMIN_USER, SUPERADMIN_EMAIL } = process.env;

async function setUpAdmin() {
  let transaction;
  try {
    const UserModel = sequelize.models["Users"];
    const UserRolesModel = sequelize.models["UserRoles"];

    transaction = await sequelize.transaction();

    const hash = await bcrypt.hash(SUPERADMIN_PASS, 10);

    const [user, newUser] = await UserModel.findOrCreate({
      where: { username: SUPERADMIN_USER },
      defaults: {
        password: hash,
        email: SUPERADMIN_EMAIL,
        username: SUPERADMIN_USER,
      },
      transaction,
    });

    if (newUser) {
      const [role, newRole] = await UserRolesModel.findOrCreate({
        where: { role: "superadmin" },
        defaults: { role: "superadmin" },
        transaction,
      });

      if (newRole) {
        await role.addUser(user, { transaction });
      }

      const permissions = role?.permissions || {};
      const updatedPermissions = Object.fromEntries(
        Object.keys(permissions).map((permission) => [permission, true])
      );

      await role.update({ permissions: updatedPermissions }, { transaction });

      await transaction.commit();
      console.log("Cuenta superusuario disponible");
    }
  } catch (error) {
    if (transaction) {
      await transaction.rollback();
    }
    logger.info(`Se produjo un error \n ${error}`);
  }
}

export default setUpAdmin;
