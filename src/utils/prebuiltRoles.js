import { injectedModels } from "../../db.js";

export default async function setupPrebuiltRoles() {
  try {
    await injectedModels.UserRoles.create({
      role: "none",
    });

    console.log("Prebuilt-roles disponibles");
  } catch (error) {
    console.error("----- error in setup prebuilt roles", error);
  }
}
