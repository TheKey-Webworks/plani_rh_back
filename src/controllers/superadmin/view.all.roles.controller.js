import { injectedModels } from "../../../db.js";

export async function viewAllRolesController() {
  try {
    const allRoles = await injectedModels["UserRoles"].findAll();
    return { message: "", status: 200, data: allRoles };
  } catch (error) {
    return {
      message: "Se produjo un error al obtener el listado de roles",
      status: 500,
      data: [],
    };
  }
}
