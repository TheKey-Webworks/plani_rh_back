import { request, response } from "express";
import logoutController from "../../controllers/logout.controller.js";

export default async function logoutHandler(req = request, res = response) {
  try {
    const [_, token] = req.headers.authorization?.split(" ");
    const { message, status } = await logoutController({ token });
    return res.status(status).json({ message });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message });
  }
}
