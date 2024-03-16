import { Router } from "express";
import PedidoGarcomMesaCtrl from "../Controle/pedidoGarcomMesaCtrl.js";

const pedidoGarcomMesaCtrl = new PedidoGarcomMesaCtrl();
const rotaPedidoGarcomMesa = Router();

rotaPedidoGarcomMesa
  .post("/", pedidoGarcomMesaCtrl.gravar)
  .put("/:idPedido", pedidoGarcomMesaCtrl.atualizar)
  .delete("/:idPedido", pedidoGarcomMesaCtrl.excluir)
  .get("/:idPedido", pedidoGarcomMesaCtrl.consultarPorId);

export default rotaPedidoGarcomMesa;
