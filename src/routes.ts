import { Router } from "express";
import { createReport, getReports } from "./controller/ReportController";

const routes = Router();

routes.get("/reports", getReports);
routes.post("/reports", createReport);

export default routes;
