import { injectedModels } from "../../../db.js";

export default async function ViewAllUsersController() {
  try {
    const data = await injectedModels["User"].findAll({
      include: {
        model: injectedModels["UserRoles"],
      },
    });
    const d = data?.map((user) => {
      return {
        username: user?.username,
        email: user?.email,
        role: user?.UserRole?.role,
      };
    });
    return { data: d, status: 200, message: "Lista de usuarios" };
  } catch (error) {
    return { status: 500, message: error.message };
  }
}
