import { Router } from "express";
import RestauranteCtrl from "../Controle/restauranteCtrl.js";

const restauranteCtrl = new RestauranteCtrl();
const rotaRestaurante = new Router();

rotaRestaurante
  .get("/", restauranteCtrl.consultar)
  .get("/:termo", restauranteCtrl.consultar)
  .post("/", restauranteCtrl.gravar)
  .patch("/", restauranteCtrl.atualizar)
  .put("/", restauranteCtrl.atualizar)
  .delete("/", restauranteCtrl.excluir);

export default rotaRestaurante;
