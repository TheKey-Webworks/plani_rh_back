import { request, response } from "express";
import { validateToken } from "../utils/jwt.js";
import sequelize, { injectedModels } from "../../db.js";

export async function isSuperAdmin(req = request, res = response, next) {
  try {
    const [_, token] = req.headers?.authorization?.split(" ");

    const { id } = validateToken(token);

    const user = await sequelize.models["Users"].findOne({
      where: {
        id,
      },
      include: {
        model: injectedModels.UserRoles,
      },
    });

    if (!user) {
      return res.status(404).json({ message: "Usuario incorrecto" });
    }

    const userRole = user?.UserRole;
    const { role } = userRole;

    return role === "superadmin"
      ? next()
      : res
          .status(401)
          .json({ message: "No tenés permiso para realizar esta acción" });
  } catch (error) {
    console.error(error);
    return res.json(error);
  }
}
export async function checkPermissions(req = request, res = response) {}
