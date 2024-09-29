import { Router } from "express";
import { UsuarioController } from "./controller/UserController";
import { MoradorController } from "./controller/MoradorController";
import { ColaboradorController } from "./controller/ColaboradorController";
import { EntregaController } from "./controller/EntregaController";
import { AvaliacaoController } from "./controller/AvaliacaoController";
import { SuporteController } from "./controller/SuporteController";
import { IntegracaoController } from "./controller/IntegracaoController";
import { NotificacaoController } from "./controller/NotificacaoController";
import { CondominioController } from "./controller/CondominioController";
import { IFoodController } from "./controller/IFoodController";

const routes = Router();

const usuarioController = new UsuarioController();
const moradorController = new MoradorController();
const colaboradorController = new ColaboradorController();
const entregaController = new EntregaController();
const avaliacaoController = new AvaliacaoController();
const suporteController = new SuporteController();
const integracaoController = new IntegracaoController();
const notificacaoController = new NotificacaoController();
const condominioController = new CondominioController();
const ifoodController = new IFoodController();

routes.post("/login", usuarioController.login.bind(usuarioController));

routes.get("/usuarios", usuarioController.getAll.bind(usuarioController));
routes.get("/usuarios/:id", usuarioController.getById.bind(usuarioController));
routes.post("/usuarios", usuarioController.create.bind(usuarioController));
routes.put("/usuarios/:id", usuarioController.update.bind(usuarioController));
routes.delete(
  "/usuarios/:id",
  usuarioController.delete.bind(usuarioController)
);

routes.get(
  "/moradores/:id/integracoes",
  moradorController.getIntegracoes.bind(moradorController)
);
routes.get("/moradores", moradorController.getAll.bind(moradorController));
routes.get("/moradores/:id", moradorController.getById.bind(moradorController));
routes.post("/moradores", moradorController.create.bind(moradorController));
routes.put("/moradores/:id", moradorController.update.bind(moradorController));
routes.delete(
  "/moradores/:id",
  moradorController.delete.bind(moradorController)
);
routes.get(
  "/moradores/:id/entregas",
  moradorController.getEntregas.bind(moradorController)
);
routes.get(
  "/moradores/:id/notificacoes",
  moradorController.getNotificacoes.bind(moradorController)
);

routes.get(
  "/colaboradores",
  colaboradorController.getAll.bind(colaboradorController)
);
routes.get(
  "/colaboradores/:id",
  colaboradorController.getById.bind(colaboradorController)
);
routes.post(
  "/colaboradores",
  colaboradorController.create.bind(colaboradorController)
);
routes.put(
  "/colaboradores/:id",
  colaboradorController.update.bind(colaboradorController)
);
routes.delete(
  "/colaboradores/:id",
  colaboradorController.delete.bind(colaboradorController)
);
routes.get(
  "/colaboradores/:id/entregas",
  colaboradorController.getEntregas.bind(colaboradorController)
);
routes.get(
  "/colaboradores/:id/avaliacoes",
  colaboradorController.getAvaliacoes.bind(colaboradorController)
);

routes.get("/entregas", entregaController.getAll.bind(entregaController));
routes.get("/entregas/:id", entregaController.getById.bind(entregaController));
routes.post("/entregas", entregaController.create.bind(entregaController));
routes.put("/entregas/:id", entregaController.update.bind(entregaController));
routes.patch("/entregas/:id", entregaController.update.bind(entregaController));
routes.delete(
  "/entregas/:id",
  entregaController.delete.bind(entregaController)
);

routes.get("/avaliacoes", avaliacaoController.getAll.bind(avaliacaoController));
routes.get(
  "/avaliacoes/:id",
  avaliacaoController.getById.bind(avaliacaoController)
);
routes.post(
  "/avaliacoes",
  avaliacaoController.create.bind(avaliacaoController)
);
routes.put(
  "/avaliacoes/:id",
  avaliacaoController.update.bind(avaliacaoController)
);
routes.delete(
  "/avaliacoes/:id",
  avaliacaoController.delete.bind(avaliacaoController)
);

routes.get("/suportes", suporteController.getAll.bind(suporteController));
routes.get("/suportes/:id", suporteController.getById.bind(suporteController));
routes.post("/suportes", suporteController.create.bind(suporteController));
routes.put("/suportes/:id", suporteController.update.bind(suporteController));
routes.delete(
  "/suportes/:id",
  suporteController.delete.bind(suporteController)
);

routes.get(
  "/integracoes",
  integracaoController.getAll.bind(integracaoController)
);
routes.get(
  "/integracoes/:id",
  integracaoController.getById.bind(integracaoController)
);
routes.post(
  "/integracoes",
  integracaoController.create.bind(integracaoController)
);
routes.put(
  "/integracoes/:id",
  integracaoController.update.bind(integracaoController)
);
routes.delete(
  "/integracoes/:id",
  integracaoController.delete.bind(integracaoController)
);

routes.get(
  "/notificacoes",
  notificacaoController.getAll.bind(notificacaoController)
);
routes.get(
  "/notificacoes/:id",
  notificacaoController.getById.bind(notificacaoController)
);
routes.post(
  "/notificacoes",
  notificacaoController.create.bind(notificacaoController)
);
routes.put(
  "/notificacoes/:id",
  notificacaoController.update.bind(notificacaoController)
);
routes.delete(
  "/notificacoes/:id",
  notificacaoController.delete.bind(notificacaoController)
);

routes.get(
  "/condominios",
  condominioController.getAll.bind(condominioController)
);
routes.get(
  "/condominios/:id",
  condominioController.getById.bind(condominioController)
);
routes.post(
  "/condominios",
  condominioController.create.bind(condominioController)
);
routes.put(
  "/condominios/:id",
  condominioController.update.bind(condominioController)
);
routes.delete(
  "/condominios/:id",
  condominioController.delete.bind(condominioController)
);

routes.post(
  "/ifood/user-code",
  ifoodController.getUserCode.bind(ifoodController)
);
routes.post(
  "/ifood/exchange-token",
  ifoodController.exchangeAuthorizationCode.bind(ifoodController)
);
routes.get("/ifood/orders", ifoodController.getOrders.bind(ifoodController));
routes.post(
  "/ifood/refresh-token",
  ifoodController.refreshAccessToken.bind(ifoodController)
);

export { routes };
