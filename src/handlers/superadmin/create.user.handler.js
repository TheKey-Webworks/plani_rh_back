import { request, response } from "express";
import createUserController from "../../controllers/superadmin/create.user.controller.js";

export default async function createUserHandler(
  req = request,
  res = response,
  next
) {
  try {
    const { username, email } = req.body;
    const { message, data, status } = await createUserController({
      username,
      email,
    });

    return res.status(status).json({ message, data });
  } catch (error) {
    console.error(error);
  }
}
