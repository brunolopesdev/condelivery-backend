import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Notificacao } from "../entity/Notificacao";
import { BaseController } from "./BaseController";
import { Morador } from "../entity/Morador";
import { emitNotification } from "../index";

export class NotificacaoController extends BaseController<Notificacao> {
  constructor() {
    super(AppDataSource.getRepository(Notificacao));
  }

  async create(req: Request, res: Response): Promise<Response> {
    try {
      const { moradorId, mensagem, data } = req.body;

      const moradorRepository = AppDataSource.getRepository(Morador);
      const morador = await moradorRepository.findOne({
        where: { id: moradorId },
      });

      if (!morador) {
        return res.status(404).json({ message: "Morador não encontrado" });
      }

      const novaNotificacao = this.repository.create({
        mensagem,
        data: data ? new Date(data) : new Date(),
        morador,
      });

      const result = await this.repository.save(novaNotificacao);

      emitNotification({
        ...result,
        data: result.data.toISOString(),
      });

      return res.status(201).json(result);
    } catch (error) {
      console.error("Erro ao criar notificação:", error);
      return res.status(500).json({ message: "Erro ao criar notificação" });
    }
  }
}
