import { Router } from "express";
import GarcomMesaCtrl from "../Controle/garcomMesaCtrl.js";

const garcomMesaCtrl = new GarcomMesaCtrl();
const rotaGarcomMesa = new Router();

rotaGarcomMesa
    .post("/", garcomMesaCtrl.gravar)
    .delete("/", garcomMesaCtrl.excluir)
    .get("/garcons/:GarcomId", garcomMesaCtrl.consultarMesasDoGarcom)
    .get("/mesas/:MesaId", garcomMesaCtrl.consultarGarconsDaMesa)
    .get("/todos", garcomMesaCtrl.listarRelacoes);

export default rotaGarcomMesa;
