import { AppDataSource } from "../data-source";
import { Avaliacao } from "../entity/Avaliacao";
import { Colaborador } from "../entity/Colaborador";
import { Morador } from "../entity/Morador";
import { BaseController } from "./BaseController";
import { Request, Response } from "express";

export class AvaliacaoController extends BaseController<Avaliacao> {
  constructor() {
    super(AppDataSource.getRepository(Avaliacao));
  }

  async create(req: Request, res: Response) {
    const { moradorId, colaboradorId, nota, comentarios, data_avaliacao } =
      req.body;

    const avaliacao = new Avaliacao();
    avaliacao.morador = { id: moradorId } as Morador;
    avaliacao.colaborador = { id: colaboradorId } as Colaborador;
    avaliacao.nota = nota;
    avaliacao.comentarios = comentarios;
    avaliacao.data_avaliacao = new Date(data_avaliacao);

    try {
      const savedAvaliacao = await this.repository.save(avaliacao);
      return res.status(201).json(savedAvaliacao);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Erro ao salvar a avaliação" });
    }
  }
}
