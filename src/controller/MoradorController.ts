import { Request, Response } from "express";
import { Morador } from "../entity/Morador";
import { Usuario } from "../entity/Usuario";
import { Condominio } from "../entity/Condominio";
import { Integracao } from "../entity/Integracao";
import { AppDataSource } from "../data-source";
import { BaseController } from "./BaseController";
import { Notificacao } from "../entity/Notificacao";

export class MoradorController extends BaseController<Morador> {
  constructor() {
    super(AppDataSource.getRepository(Morador));
  }

  async create(req: Request, res: Response): Promise<Response> {
    const { usuarioId, condominioId, ...moradorData } = req.body;

    const usuarioRepository = AppDataSource.getRepository(Usuario);
    const condominioRepository = AppDataSource.getRepository(Condominio);

    const usuario = await usuarioRepository.findOneBy({ id: usuarioId });
    const condominio = await condominioRepository.findOneBy({
      id: condominioId,
    });

    if (!usuario) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    if (!condominio) {
      return res.status(404).json({ message: "Condomínio não encontrado" });
    }

    const morador = this.repository.create({
      ...moradorData,
      usuario,
      condominio,
    });

    const result = await this.repository.save(morador);
    return res.status(201).json(result);
  }

  async getEntregas(req: Request, res: Response): Promise<Response> {
    const moradorId = req.params.id;

    const morador = await this.repository.findOne({
      where: { id: Number(moradorId) },
      relations: ["entregas", "entregas.colaborador"],
    });

    if (!morador) {
      return res.status(404).json({ message: "Morador não encontrado." });
    }

    return res.json(morador.entregas);
  }

  async getNotificacoes(req: Request, res: Response): Promise<Response> {
    const moradorId = req.params.id;

    const morador = await this.repository.findOne({
      where: { id: Number(moradorId) },
      relations: ["notificacoes"],
    });

    if (!morador) {
      return res.status(404).json({ message: "Morador não encontrado." });
    }

    return res.json(morador.notificacoes);
  }

  async getIntegracoes(req: Request, res: Response): Promise<Response> {
    const moradorId = req.params.id;

    const morador = await this.repository.findOne({
      where: { id: Number(moradorId) },
      relations: ["integracoes"],
    });

    if (!morador) {
      return res.status(404).json({ message: "Morador não encontrado." });
    }

    return res.json(morador.integracoes);
  }
}
