import "reflect-metadata";
import "dotenv/config";
import cors from "cors";
import express from "express";
import swaggerUi from "swagger-ui-express";

import swaggerFile from "../swagger/swagger.json";

import "express-async-errors";
import createConnection from "../database/index";

import routes from "../../routes";
import { handleErrorMiddleware } from "../../middlewares";

createConnection();
const app = express();
app.use(cors());

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use(routes);

app.use(handleErrorMiddleware);

export default app;
