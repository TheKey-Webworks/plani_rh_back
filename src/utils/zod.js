import { z } from "zod";

// Esquema de validación para el registro
const registerValidations = z.object({
  username: z.string({ message: "Este campo recibe cadenas de texto" }),
  password: z
    .string()
    .min(6, { message: "La contraseña debe tener al menos 6 caracteres" })
    .max(32, { message: "La contraseña no puede tener más de 32 caracteres" }),
  email: z
    .string()
    .email({ message: "Dirección de correo electrónico inválida" }),
});

// Esquema de validación para el inicio de sesión
const loginValidations = z.object({
  username: z.string({ message: "Este campo recibe cadenas de texto" }),
  password: z
    .string()
    .min(6, { message: "La contraseña debe tener al menos 6 caracteres" })
    .max(32, { message: "La contraseña no puede tener más de 32 caracteres" }),
});

const createRoleValidations = z.object({
  role: z.string({ message: "Este campo recibe cadenas de texto" }),
});

const validPermissionKeys = [
  "createUser",
  "editUser",
  "deleteUser",
  "viewUser",
  "createRole",
  "editRole",
  "deleteRole",
  "assignRole",
  "createPermission",
  "editPermission",
  "deletePermission",
  "assignPermission",
  "viewReports",
  "generateReports",
  "viewDashboard",
  "manageSettings",
];

const permissionsSchema = z.object(
  validPermissionKeys.reduce((acc, key) => {
    acc[key] = z
      .boolean({
        message: `El permiso ${key} debe ser un valor booleano.`,
      })
      .optional();
    return acc;
  }, {})
);

const editRoleValidations = z.object({
  roleId: z
    .string({ message: "Este campo recibe cadenas de texto" })
    .uuid({ message: "El id de rol es inválido." }),
  role: z
    .string({
      message: "Este campo recibe cadenas de texto",
    })
    .optional(),
    
  permissions: permissionsSchema,
});

// Función para validar los datos contra un esquema
function validateSchemas(schema, data) {
  try {
    return { data: schema.parse(data), error: false };
  } catch (error) {
    return { data: error.errors, error: true };
  }
}

export {
  createRoleValidations,
  registerValidations,
  loginValidations,
  editRoleValidations,
  validateSchemas,
};
