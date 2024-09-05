//3rd party import

import express, { json, urlencoded } from "express";
import morgan from "morgan";

// local import
import router from "./routes/router.js";

const app = express();
app.use(morgan("dev"));
app.use(json());
app.use(urlencoded({ extended: true }));

app.use("/v1", router);

export default app;
