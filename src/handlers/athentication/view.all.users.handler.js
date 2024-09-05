import { request, response } from "express";
import ViewAllUsersController from "../../controllers/superadmin/view.all.users.controller.js";

export default async function viewAllUsersHandler(
  req = request,
  res = response
) {
  const { message, data, status } = await ViewAllUsersController();
  return res.status(status).json({ message, data });
}
