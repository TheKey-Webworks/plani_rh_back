import { Router } from "express";
import loginHandler from "../handlers/athentication/login.handler.js";
import logoutHandler from "../handlers/athentication/logout.handler.js";
import { isSuperAdmin } from "../middleware/privilegesMiddleware.js";

const route = Router();

route.post("/login", loginHandler);
route.get("/logout", logoutHandler);

export default route;
