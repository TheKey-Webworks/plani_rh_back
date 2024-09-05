import { Router } from "express";
import loginHandler from "../handlers/athentication/login.handler.js";
import logoutHandler from "../handlers/athentication/logout.handler.js";
import checkTokenMiddleware from "../middleware/checkBlacklistedToken.js";

const route = Router();

route.post("/login", loginHandler);
route.get("/logout", checkTokenMiddleware, logoutHandler);

export default route;
