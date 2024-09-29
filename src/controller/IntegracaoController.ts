import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Integracao } from "../entity/Integracao";
import { Morador } from "../entity/Morador";
import { BaseController } from "./BaseController";

export class IntegracaoController extends BaseController<Integracao> {
  constructor() {
    super(AppDataSource.getRepository(Integracao));
  }

  async create(req: Request, res: Response): Promise<Response> {
    const { moradorId, plataforma, status } = req.body;

    if (!moradorId || !plataforma || !status) {
      return res.status(400).json({ message: "All fields are required" });
    }

    try {
      const morador = await AppDataSource.getRepository(Morador).findOne({
        where: { id: moradorId },
      });

      if (!morador) {
        return res.status(404).json({ message: "Morador not found" });
      }

      const integracao = this.repository.create({
        morador,
        plataforma,
        data_integracao: new Date(),
        status,
      });

      const result = await this.repository.save(integracao);
      return res.status(201).json(result);
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Error creating integration", error });
    }
  }
}
