import { AppDataSource } from "../data-source";
import Report from "../entity/Report";
import { Request, Response } from "express";
import multiparty from "multiparty";
import fs from "fs";
import path from "path";

const repository = AppDataSource.getRepository(Report);

export const getReports = async (request: Request, response: Response) => {
  const reports = await repository.find();
  return response.json(reports);
};

export const createReport = async (request: Request, response: Response) => {
  const form = new multiparty.Form();

  const uploadDir = path.join("src", "tmp", "uploads");

  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  form.uploadDir = uploadDir;

  form.parse(request, async (err, fields, files) => {
    if (err) {
      console.error(err);
      return response.status(500).json({ error: "Internal Server Error" });
    }

    try {
      const { name, email, message, lat, lng } = fields;
      const imageFile = files.image?.[0];

      let imagePath = "";

      if (imageFile) {
        const imagePathRelative = imageFile.path.replace(uploadDir, "");
        imagePath = imagePathRelative.replace(/\\/g, "/");
      }

      const report = repository.create({
        name: name[0],
        email: email[0],
        message: message[0],
        image: imagePath,
        lat: parseFloat(lat[0]),
        lng: parseFloat(lng[0]),
      });

      await repository.save(report);

      return response.status(201).json(report);
    } catch (error) {
      console.error(error);
      return response.status(500).json({ error: "Internal Server Error" });
    }
  });
};
