import { Router } from "express";
import { createReport, getReports } from "./controller/ReportController";
import path from "path";
import express from "express";
import fs from "fs";

const routes = Router();

const uploadsPath = path.join(__dirname, "src", "tmp", "uploads");

try {
  if (!fs.existsSync(uploadsPath)) {
    fs.mkdirSync(uploadsPath, { recursive: true });
    console.log(`Directory created successfully: ${uploadsPath}`);
  } else {
    console.log(`Directory already exists: ${uploadsPath}`);
  }
} catch (error) {
  console.error(`Error creating directory ${uploadsPath}:`, error);
}

routes.use("/images", express.static(uploadsPath));

routes.get("/reports", getReports);
routes.post("/reports", createReport);

export default routes;
