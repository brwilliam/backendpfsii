import { Router } from "express";
import GarcomCtrl from "../Controle/garcomCtrl.js";

const garcomCtrl = new GarcomCtrl();
const rotaGarcom = new Router(); 

rotaGarcom
  .get("/", garcomCtrl.consultar)
  .get("/:id", garcomCtrl.consultarPorId)
  .post("/", garcomCtrl.gravar)
  .put("/", garcomCtrl.atualizar)
  .delete("/", garcomCtrl.excluir);

export default rotaGarcom;