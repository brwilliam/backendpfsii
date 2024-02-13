import PedidoDAO from "../Persistencia/pedidoDAO.js";

export default class Pedido {
  #IDPedido;
  #DataPedido;
  #ValorTotal;
  #restaurante; // o pedido é um objeto do restaurante

  constructor(
    IDPedido=0,
    DataPedido = "",
    ValorTotal = 0,
    restaurante = {}
  ) {
    this.#IDPedido = IDPedido; // O ID será gerado automaticamente pelo banco de dados
    this.#DataPedido = DataPedido;
    this.#ValorTotal = ValorTotal;
    this.#restaurante = restaurante;
  }

  get IDPedido() {
    return this.#IDPedido;
  }

  set IDPedido(novoIDPedido) {
    this.#IDPedido = novoIDPedido;
  }

  get DataPedido() {
    return this.#DataPedido;
  }

  set DataPedido(novaDataPedido) {
    this.#DataPedido = novaDataPedido;
  }

  get ValorTotal() {
    return this.#ValorTotal;
  }

  set ValorTotal(novoValorTotal) {
    this.#ValorTotal = novoValorTotal;
  }

  get restaurante() {
    return this.#restaurante;
  }

  set restaurante(novoRestaurante) {
    this.#restaurante = novoRestaurante;
  }

  // Método para converter o objeto Pedido em JSON
  toJSON() {
    return {
      IDPedido: this.#IDPedido,
      DataPedido: this.#DataPedido,
      ValorTotal: this.#ValorTotal,
      restaurante: this.#restaurante
    };
  }

  async gravar() {
    const pedDAO = new PedidoDAO();
    await pedDAO.gravar(this);
  }

  async excluir() {
    const pedDAO = new PedidoDAO();
    await pedDAO.excluir(this);
  }

  async alterar() {
    const pedDAO = new PedidoDAO();
    await pedDAO.atualizar(this);
  }

  async consultar(termo) {
    const pedDAO = new PedidoDAO();
    return await pedDAO.consultar(termo);
  }
}
