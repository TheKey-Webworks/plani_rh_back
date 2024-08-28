import app from "./src/app.js";
import { config } from "dotenv";
import logger from "./src/config/winston.js";
import sequelize from "./db.js";
import setUpAdmin from "./src/utils/setupAdmin.js";
import setupPrebuiltRoles from "./src/utils/prebuiltRoles.js";

config();

const { PORT } = process.env || 8080;

// funcion iniciadora
async function initServer() {
  let transaction;
  try {
    await sequelize.authenticate();
    await sequelize.sync({ force: true });

    console.log("Base de datos actualizada");

    await setupPrebuiltRoles();
    await setUpAdmin();

    app.listen(PORT, function () {
      logger.info(`Server running on port ${PORT}`);
      console.log(sequelize.models);
    });
  } catch (error) {
    await transaction.rollback();
    logger.info(`Se produjo un error \n ${error}`);
  }
}

//iniciar server
initServer();
