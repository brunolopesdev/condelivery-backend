import { AppDataSource } from "../data-source";
import Report from "../entity/Report";
import { Request, Response } from "express";

const repository = AppDataSource.getRepository(Report);

export const getReports = async (request: Request, response: Response) => {
  const reports = await repository.find();
  return response.json(reports);
};

export const createReport = async (request: Request, response: Response) => {
  try {
    const { name, email, message, lat, lng, image } = request.body;

    const report = repository.create({
      name,
      email,
      message,
      image,
      lat: parseFloat(lat),
      lng: parseFloat(lng),
    });

    await repository.save(report);

    return response.status(201).json(report);
  } catch (error) {
    console.error("Error saving report:", error);
    return response.status(500).json({ error: "Internal Server Error" });
  }
};
