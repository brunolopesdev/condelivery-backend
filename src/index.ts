import "reflect-metadata";
import * as express from "express";
import { AppDataSource } from "./data-source";
import * as bodyParser from "body-parser";
import routes from "./routes";
import * as cors from "cors";

AppDataSource.initialize().then(async () => {
  const app = express();

  app.use(cors()); // Adicione esta linha para permitir CORS
  app.use(bodyParser.json());
  app.use(routes);
  app.listen(3333);
});
