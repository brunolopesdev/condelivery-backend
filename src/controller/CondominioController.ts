import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Condominio } from "../entity/Condominio";
import { BaseController } from "./BaseController";

export class CondominioController extends BaseController<Condominio> {
  constructor() {
    super(AppDataSource.getRepository(Condominio));
  }
}
