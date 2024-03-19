import { Router } from "express";
import MesaCtrl from "../Controle/mesaCtrl.js";

const mesaCtrl = new MesaCtrl();
const rotaMesa = new Router();

rotaMesa
    .get("/", mesaCtrl.consultar)
    .get("/:termo", mesaCtrl.consultar)
    .post("/", mesaCtrl.gravar)
    .patch("/", mesaCtrl.atualizar)
    .put("/", mesaCtrl.atualizar)
    .delete("/", mesaCtrl.excluir);

export default rotaMesa;