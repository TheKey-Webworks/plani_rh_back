import { Op } from "sequelize";
import { injectedModels } from "../../../db.js";

export default async function createUserController({ username, email }) {
  try {
    const [user, isNew] = await injectedModels["User"].findOrCreate({
      where: {
        [Op.or]: [{ username }, { email }],
      },
      defaults: {
        username,
        email,
      },
    });

    if (!isNew) {
      return { message: "El usuario ya existe", status: 409 };
    }

    const role = await injectedModels["UserRoles"].findOne({
      where: { role: "none" },
    });

    await user.setUserRole(role);

    return { status: 201, message: "Usuario creado con éxito." };
  } catch (error) {
    console.log(error);
    return { status: 500, message: error.message };
  }
}
