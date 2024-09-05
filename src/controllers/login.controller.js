//3rd party import
import { Op } from "sequelize";
import bcrypt from "bcrypt";

// local imports
import sequelize from "../../db.js";
import logger from "../config/winston.js";
import { createToken } from "../utils/jwt.js";

export default async function loginController({ username, password }) {
  const result = {
    message: "default message",
    status: 201,
    error: false,
    data: {},
  };
  try {
    const user = await sequelize.models["Users"].findOne({
      where: {
        [Op.or]: [{ username: username }, { email: username }],
      },
    });

    if (!user) {
      result.message = "El usuario no existe";
      result.status = 404;
      return result;
    }

    const match = await bcrypt.compare(password, user?.password);

    if (!match) {
      result.message = "La contraseña es incorrecta";
      result.status = 401;
      return result;
    }

    const token = createToken({ id: user.id }, "7d");
    result.message = "Iniciaste sesión";
    result.status = 200;
    result.data = { token };
  } catch (error) {
    logger.error(error);
    result.error = true;
    result.message = "Se produjo un error al iniciar sesión";
    result.status = 500;
  }
  return result;
}
