import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Entrega } from "../entity/Entrega";
import { Morador } from "../entity/Morador";
import { Colaborador } from "../entity/Colaborador";
import { BaseController } from "./BaseController";

export class EntregaController extends BaseController<Entrega> {
  constructor() {
    super(AppDataSource.getRepository(Entrega));
  }

  async create(req: Request, res: Response): Promise<Response> {
    const {
      moradorId,
      colaboradorId,
      data_entrega,
      codigo_confirmacao,
      status,
      plataforma,
    } = req.body;

    const moradorRepository = AppDataSource.getRepository(Morador);
    const colaboradorRepository = AppDataSource.getRepository(Colaborador);

    const morador = await moradorRepository.findOne({
      where: { id: moradorId },
    });

    const colaborador = await colaboradorRepository.findOne({
      where: { id: colaboradorId },
    });

    if (!morador || !colaborador) {
      return res
        .status(404)
        .json({ message: "Morador ou Colaborador não encontrado." });
    }

    const novaEntrega = this.repository.create({
      morador,
      colaborador,
      data_entrega: new Date(data_entrega),
      codigo_confirmacao,
      status,
      plataforma,
      complemento: morador.complemento,
    });

    const result = await this.repository.save(novaEntrega);
    return res.status(201).json(result);
  }
}
