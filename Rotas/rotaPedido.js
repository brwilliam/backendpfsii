import { Router } from "express";
import PedidoCtrl from "../Controle/pedidoCtrl.js";

const pedidoCtrl = new PedidoCtrl();
const rotaPedido = new Router();

rotaPedido
  .post("/", pedidoCtrl.gravar) // Cria um novo pedido
  .get("/", pedidoCtrl.consultar) // Lista todos os pedidos
  .delete("/", pedidoCtrl.excluir); // Exclui um pedido específico

export default rotaPedido;
