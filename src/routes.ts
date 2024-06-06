import { Router } from "express";
import { createReport, getReports } from "./controller/ReportController";
import path from "path";
import express from "express";

const routes = Router();

const uploadsPath = path.join(__dirname, "tmp", "uploads");

console.log(uploadsPath);
routes.use("/images", express.static(uploadsPath));

routes.get("/reports", getReports);
routes.post("/reports", createReport);

export default routes;
