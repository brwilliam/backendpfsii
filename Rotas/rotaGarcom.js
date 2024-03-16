import { Router } from "express";
import GarcomCtrl from "../Controle/garcomCtrl.js";

const garcomCtrl = new GarcomCtrl();
const rotaGarcom = Router();

rotaGarcom
  .get("/", garcomCtrl.consultar)
  .get("/:id", garcomCtrl.consultarPorId)
  .post("/", garcomCtrl.gravar)
  .put("/:id", garcomCtrl.atualizar)
  .delete("/:id", garcomCtrl.excluir);

export default rotaGarcom;