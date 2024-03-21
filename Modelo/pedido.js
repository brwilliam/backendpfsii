import PedidoDAO from "../Persistencia/pedidoDAO.js";

export default class Pedido {
  #PedidoId;
  #DataPedido;
  #IdRestaurante;

  constructor(PedidoId = 0, DataPedido = new Date(), IdRestaurante = 0) {
    this.#PedidoId = PedidoId;
    this.#DataPedido = DataPedido;
    this.#IdRestaurante = IdRestaurante;
  }

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

  async gravar() {
    const pedidoDAO = new PedidoDAO();
    const pedido = { PedidoId: this.#PedidoId, DataPedido: this.#DataPedido, IdRestaurante: this.#IdRestaurante };
    await pedidoDAO.gravar(pedido);
  }

  async consultarPedidosDoRestaurante(IdRestaurante) {
    const pedidoDAO = new PedidoDAO();
    return await pedidoDAO.consultarPedidosDoRestaurante(IdRestaurante);
  }

  async listarPedidos() {
    const pedidoDAO = new PedidoDAO();
    return await pedidoDAO.listarPedidos();
  }

  async excluir() {
    const pedidoDAO = new PedidoDAO();
    await pedidoDAO.excluir(this);
  }
}
