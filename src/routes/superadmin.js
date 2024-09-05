import { Router } from "express";
import { isSuperAdmin } from "../middleware/privilegesMiddleware.js";
import checkTokenMiddleware from "../middleware/checkBlacklistedToken.js";
import createUserHandler from "../handlers/superadmin/create.user.handler.js";
import createRoleHandler from "../handlers/superadmin/create.role.handler.js";
import viewAllUsersHandler from "../handlers/athentication/view.all.users.handler.js";
import editRoleHandler from "../handlers/superadmin/edit.role.handler.js";
import { viewAllRolesHandler } from "../handlers/superadmin/view.roles.handler.js";

const route = Router();

// route.use(checkTokenMiddleware, isSuperAdmin);

//manage roles
route.post("/create_role", createRoleHandler);
route.patch("/edit_role", editRoleHandler)
route.get("/view_all_roles", viewAllRolesHandler)

//manage users
route.post("/create_user", createUserHandler);

//view users
route.get("/view_all_users", viewAllUsersHandler);

export default route;
