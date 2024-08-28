import app from "./src/app.js";
import { config } from "dotenv";
import logger from "./src/config/winston.js";
import sequelize from "./db.js";

config();

const { PORT, SUPERADMIN_PASS, SUPERADMIN_USER } = process.env || 8080;

// funcion iniciadora
async function initServer() {
  let transaction;
  try {
    await sequelize.authenticate();
    await sequelize.sync({ force: true });

    console.log("Base de datos actualizada");
    console.log(sequelize.models);

    const UserModel = sequelize.models["Users"];
    const UserRolesModel = sequelize.models["UserRoles"];

    transaction = await sequelize.transaction();

    const [user, newUser] = await UserModel.findOrCreate({
      where: {
        username: SUPERADMIN_USER,
      },
      defaults: {
        password: SUPERADMIN_PASS,
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
        role.setUsers(user);
      }

      await transaction.commit();
      console.log("Cuenta superusuario disponible");
    }

    app.listen(PORT, function () {
      logger.info(`Server running on port ${PORT}`);
    });
  } catch (error) {
    await transaction.rollback();
    logger.info(`Se produjo un error \n ${error}`);
  }
}

//iniciar server
initServer();
