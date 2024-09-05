import { request, response } from "express";
import { createRoleValidations, validateSchemas } from "../../utils/zod.js";
import createRoleController from "../../controllers/superadmin/create.role.controller.js";

export default async function createRoleHandler(req = request, res = response) {
  try {
    const { error, data } = validateSchemas(createRoleValidations, req.body);
    if (error) {
      const parsedErrors = data?.map((e) => ({
        message: e.message,
        path: e.path,
      }));

      return res
        .status(400)
        .json({ message: "Errores en el formulario", data: parsedErrors });
    }

    const { role } = data;

    const {
      message,
      status,
      error: controllerError,
    } = await createRoleController({ role });
    return res.status(status).json({ message, controllerError });
  } catch (error) {
    console.log(error);
  }
}
