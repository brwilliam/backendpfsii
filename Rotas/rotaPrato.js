import { Router } from "express";
import PratoCtrl from "../Controle/pratoCtrl.js";

const pratoCtrl = new PratoCtrl();
const rotaPrato = Router();

rotaPrato
  .get("/", pratoCtrl.listar)
  .get("/:id", pratoCtrl.obterPorId)
  .post("/", pratoCtrl.gravar)
  .put("/:id", pratoCtrl.atualizar)
  .delete("/:id", pratoCtrl.excluir);

export default rotaPrato;
