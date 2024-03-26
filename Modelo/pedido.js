// Pedido.js
import PedidoDAO from "../Persistencia/pedidoDAO.js";

export default class Pedido {
  #PedidoId;
  #DataPedido;
  #IdRestaurante;
  #ValorTotal;
  #GarcomMesa;

  constructor(PedidoId = 0, DataPedido = new Date(), IdRestaurante = 0, ValorTotal = 0, GarcomMesa = null) {
    this.#PedidoId = PedidoId;
    this.#DataPedido = DataPedido;
    this.#IdRestaurante = IdRestaurante;
    this.#ValorTotal = ValorTotal;
    this.#GarcomMesa = GarcomMesa;
  }

  // Getters e Setters
  get PedidoId() {
    return this.#PedidoId;
  }

  set PedidoId(newId) {
    this.#PedidoId = newId;
  }

  get DataPedido() {
    return this.#DataPedido;
  }

  set DataPedido(newDate) {
    this.#DataPedido = newDate;
  }

  get IdRestaurante() {
    return this.#IdRestaurante;
  }

  set IdRestaurante(newId) {
    this.#IdRestaurante = newId;
  }

  get ValorTotal() {
    return this.#ValorTotal;
  }

  set ValorTotal(newValue) {
    this.#ValorTotal = newValue;
  }

  get GarcomMesa() {
    return this.#GarcomMesa;
  }

  set GarcomMesa(newGarcomMesa) {
    this.#GarcomMesa = newGarcomMesa;
  }

  async gravar() {
    const pedidoDAO = new PedidoDAO();
    const pedido = {
      PedidoId: this.#PedidoId,
      dataPedido: this.#DataPedido,
      idRestaurante: this.#IdRestaurante,
      valorTotal: this.#ValorTotal,
      GarcomMesa: {
        GarcomId: this.#GarcomMesa?.GarcomId,
        MesaId: this.#GarcomMesa?.MesaId
      }
    };
    await pedidoDAO.gravar(pedido);
  }

  async consultar() {
    const pedidoDAO = new PedidoDAO();
    return await pedidoDAO.consultar();
  }

  async excluir() {
    const pedidoDAO = new PedidoDAO();
    await pedidoDAO.excluir(this.#PedidoId);
  }
}
