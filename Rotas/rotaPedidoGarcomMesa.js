import { Router } from "express";
import PedidoGarcomMesaCtrl from "../Controle/pedidoGarcomMesaCtrl.js";

const pedidoGarcomMesaCtrl = new PedidoGarcomMesaCtrl();
const rotaPedidoGarcomMesa = new Router();

rotaPedidoGarcomMesa
  .post("/", pedidoGarcomMesaCtrl.gravar) // Cria uma nova relação pedido-garçom-mesa
  .get("/todos", pedidoGarcomMesaCtrl.listarTodos) // Lista todas as relações pedido-garçom-mesa
  .delete("/", pedidoGarcomMesaCtrl.excluir); // Exclui uma relação pedido-garçom-mesa específica

export default rotaPedidoGarcomMesa;
