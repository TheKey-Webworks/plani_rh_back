import { request, response } from "express";
import { viewAllRolesController } from "../../controllers/superadmin/view.all.roles.controller.js";

export async function viewAllRolesHandler(req = request, res = response) {
  try {
    const { message, data, status } = await viewAllRolesController();
    return res.status(status).json({ message, data });
  } catch (error) {
    return res.json(error)
  }
}
