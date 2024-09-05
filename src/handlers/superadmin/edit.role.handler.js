import { request, response } from "express";
import { editRoleValidations, validateSchemas } from "../../utils/zod.js";
import editRoleController from "../../controllers/superadmin/edit.role.controller.js";

export default async function editRoleHandler(req = request, res = response) {
  try {
    const { error, data } = validateSchemas(editRoleValidations, req.body);
    //en caso de que haya errores en el formulario se le informa al usuario
    if (error) {
      const parsedErrorData = data?.map((e) => {
        return { path: e.path[0], message: e.message };
      });

      return res.status(400).json({
        message: "Hay errores en los campos",
        data: parsedErrorData,
      });
    }
    const {
      message,
      status,
      error: controllerError,
      data: controllerData,
    } = await editRoleController({ ...data });

    return res
      .status(status)
      .json({ message, error: controllerError, data: controllerData });
  } catch (error) {
    return res.status(500).json(error)
  }
}
