import { AppDataSource } from "../data-source";
import User from "../entity/User";
import { Request, Response } from "express";

const repository = AppDataSource.getRepository(User);

export const getUsers = async (request: Request, response: Response) => {
  const users = await repository.find();
  return response.json(users);
};

export const createUsers = async (request: Request, response: Response) => {
  const { name, email, password } = request.body;
  const user = repository.create({ name, email, password });
  await repository.save(user);
  return response.status(201).json(user);
};
