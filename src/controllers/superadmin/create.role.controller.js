import { injectedModels } from "../../../db.js";

export default async function createRoleController({ role }) {
  try {
    const [_, isNew] = await injectedModels["UserRoles"].findOrCreate({
      where: {
        role,
      },
      defaults: {
        role,
      },
    });

    if (!isNew) {
      return { message: `El rol ${role} ya existe`, status: 409 };
    }

    return { message: "Rol creado correctamente", status: 201 };
  } catch (error) {
    console.log(error);
    return {
      message: "Se produjo un error al crear el rol del usuario",
      status: 500,
    };
  }
}
