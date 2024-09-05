import { request, response } from "express";
import loginController from "../../controllers/login.controller.js";
import { loginValidations, validateSchemas } from "../../utils/zod.js";

export default async function loginHandler(req = request, res = response) {
  try {
    // validar los campos del formulario
    const { error, data } = validateSchemas(loginValidations, req.body);

    //en caso de que haya errores en el formulario se le informa al usuario
    if (error) {
      const parsedErrorData = data?.map((e) => {
        console.log(e);
        return { path: e.path[0], message: e.message };
      });

      return res.status(400).json({
        message: "Hay errores en los campos",
        data: parsedErrorData,
      });
    }

    // obtener los datos del usuario para el login
    const { username, password } = data;

    //realizar la accion de login y devolver la respuesta al cliente.
    const {
      message,
      status,
      error: controllerError,
      data: controllerData,
    } = await loginController({
      username,
      password,
    });

    return res
      .status(status)
      .json({ message, data: controllerData, error: controllerError });
  } catch (error) {
    //manejo de errores (update needed)
    console.error(error);
    return res.status(500).json({ message });
  }
}
