import { request } from "express";
import { validateToken } from "../utils/jwt.js";
import sequelize, { injectedModels } from "../../db.js";

async function checkTokenMiddleware(req = request, res = response, next) {
  try {
    const [prefix, token] = req.headers?.authorization.split(" ");
    const tokenData = validateToken(token);

    if (!tokenData) {
      return res.status(400).json({ message: "El token es inválido" });
    }

    const { id } = tokenData;
    const isBlacklisted = await sequelize.models["TokenBlacklist"].findOne({
      where: {
        token,
      },
    });

    if (isBlacklisted) {
      return res.status(401).json({ message: "El token es inválido" });
    }

    return next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
}

export default checkTokenMiddleware;
