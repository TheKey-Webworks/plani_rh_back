import { injectedModels } from "../../../db.js";

export default async function editRoleController({
  roleId,
  role,
  permissions,
}) {
  try {
    const roleToUpdate = await injectedModels["UserRoles"].findOne({
      where: {
        id: roleId,
      },
    });

    if (!roleToUpdate) {
      return { message: "El rol solicitado no existe", status: 404 };
    }


    const newPermissions = {...roleToUpdate.permissions, ...permissions}

    let nwr = await roleToUpdate.update({
      role,
      permissions: newPermissions
    });

    return { message: "Rol actualizado correctamente", status: 200, data: [nwr] };
  } catch (error) {
    console.error(`Se produjo un error al actualizar el rol, ${error}`);
    return {
      message: "Se produjo un error al actualizar el rol",
      status: 500,
      data: [error],
    };
  }
}
