import { Router } from "express";
import { createReport, getReports } from "./controller/ReportController";
import path from "path";
import express from "express";
import fs from "fs";

const routes = Router();

const uploadsPath = path.join("src", "tmp", "uploads");

if (!fs.existsSync(uploadsPath)) {
  fs.mkdirSync(uploadsPath, { recursive: true });
}

routes.use("/images", express.static(uploadsPath));

routes.get("/reports", getReports);
routes.post("/reports", createReport);

export default routes;
