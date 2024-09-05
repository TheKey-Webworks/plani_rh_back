import sequelize from "../../db.js";
import { validateToken } from "../utils/jwt.js";

export default async function logoutController({ token }) {
  const result = { message: "default message", status: 201, error: false };
  try {
    if (!token) {
      result.message = "Falta el token de autorización";
      return result;
    }

    const isValidToken = validateToken(token);

    if (!isValidToken) {
      result.message = "El token es inválido";
      result.status = 400;
      return result;
    }

    const isBlacklisted = await sequelize.models.TokenBlacklist.findOne({
      where: { token },
    });

    if (isBlacklisted) {
      result.message = "La sesión expiró";
      result.status = 401;
      return result;
    } else {
      await sequelize.models.TokenBlacklist.create({
        token,
      });

      result.status = 200;
      result.message = "Cerraste sesión";
    }
  } catch (error) {
    console.error("Se produjo un error:");
    console.error(error);
  }
  return result;
}
