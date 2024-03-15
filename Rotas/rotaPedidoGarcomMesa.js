import { Router } from "express";
import PedidoGarcomMesaCtrl from "../Controle/pedidoGarcomMesaCtrl.js";

const pedidoGarcomMesaCtrl = new PedidoGarcomMesaCtrl();
const rotaPedidoGarcomMesa = Router();

rotaPedidoGarcomMesa
  .post("/", pedidoGarcomMesaCtrl.gravarPedidoGarcomMesa)
  .put("/:idPedido", pedidoGarcomMesaCtrl.atualizarPedidoGarcomMesa)
  .delete("/:idPedido", pedidoGarcomMesaCtrl.excluirPedidoGarcomMesa)
  .get("/:idPedido", pedidoGarcomMesaCtrl.consultarPedidoGarcomMesaPorId);

export default rotaPedidoGarcomMesa;
