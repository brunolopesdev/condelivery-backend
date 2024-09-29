import { AppDataSource } from "../data-source";
import { Colaborador } from "../entity/Colaborador";
import { BaseController } from "./BaseController";
import { Usuario } from "../entity/Usuario";
import { Condominio } from "../entity/Condominio";
import { Request, Response } from "express";

export class ColaboradorController extends BaseController<Colaborador> {
  constructor() {
    super(AppDataSource.getRepository(Colaborador));
  }

  async create(req: Request, res: Response): Promise<Response> {
    const {
      usuarioId,
      condominioId,
      data_contratacao,
      numero_entregas,
      avaliacao_media,
    } = req.body;

    const usuarioRepository = AppDataSource.getRepository(Usuario);
    const condominioRepository = AppDataSource.getRepository(Condominio);

    const usuario = await usuarioRepository.findOne({
      where: { id: usuarioId },
    });
    const condominio = await condominioRepository.findOne({
      where: { id: condominioId },
    });

    if (!usuario || !condominio) {
      return res
        .status(404)
        .json({ message: "Usuário ou Condomínio não encontrado." });
    }

    if (usuario.tipo_usuario !== "Colaborador") {
      usuario.tipo_usuario = "Colaborador";
      await usuarioRepository.save(usuario);
    }

    const novoColaborador = this.repository.create({
      usuario,
      condominio,
      data_contratacao: new Date(data_contratacao),
      numero_entregas,
      avaliacao_media,
    });

    const result = await this.repository.save(novoColaborador);
    return res.status(201).json(result);
  }

  async getEntregas(req: Request, res: Response): Promise<Response> {
    const colaboradorId = parseInt(req.params.id, 10);

    const colaborador = await this.repository.findOne({
      where: { id: colaboradorId },
      relations: ["entregas", "entregas.morador"],
    });

    if (!colaborador) {
      return res.status(404).json({ message: "Colaborador não encontrado." });
    }

    return res.json(colaborador.entregas);
  }

  async getAvaliacoes(req: Request, res: Response): Promise<Response> {
    const colaboradorId = parseInt(req.params.id, 10);

    const colaborador = await this.repository.findOne({
      where: { id: colaboradorId },
      relations: ["avaliacoes"],
    });

    if (!colaborador) {
      return res.status(404).json({ message: "Colaborador não encontrado." });
    }

    return res.json(colaborador.avaliacoes);
  }
}
