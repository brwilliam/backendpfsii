import PedidoGarcomMesaDAO from "../Persistencia/pedidoGarcomMesaDAO.js";

export default class PedidoGarcomMesa {
  #idPedido;
  #idGarcom;
  #idMesa;
  #dataAtendimento;

  constructor(idPedido = 0, idGarcom = 0, idMesa = 0, dataAtendimento = new Date()) {
    this.#idPedido = idPedido;
    this.#idGarcom = idGarcom;
    this.#idMesa = idMesa;
    this.#dataAtendimento = dataAtendimento;
  }

  get idPedido() {
    return this.#idPedido;
  }

  set idPedido(newIdPedido) {
    this.#idPedido = newIdPedido;
  }

  get idGarcom() {
    return this.#idGarcom;
  }

  set idGarcom(newIdGarcom) {
    this.#idGarcom = newIdGarcom;
  }

  get idMesa() {
    return this.#idMesa;
  }

  set idMesa(newIdMesa) {
    this.#idMesa = newIdMesa;
  }

  get dataAtendimento() {
    return this.#dataAtendimento;
  }

  set dataAtendimento(newDataAtendimento) {
    this.#dataAtendimento = newDataAtendimento;
  }

  async gravar() {
    const pedidoDAO = new PedidoDAO();
    await pedidoDAO.gravar(this.toJSON());
  }

  async excluir() {
    const pedidoDAO = new PedidoDAO();
    await pedidoDAO.excluir(this.#idPedido);
  }

  async atualizar() {
    const pedidoDAO = new PedidoDAO();
    await pedidoDAO.atualizar(this.#idPedido, this.toJSON());
  }

  async consultar(termo) {
    const pedidoDAO = new PedidoDAO();
    return await pedidoDAO.consultar(termo);
  }

  // Método para converter o objeto PedidoGarcomMesa em JSON
  toJSON() {
    return {
      idPedido: this.#idPedido,
      idGarcom: this.#idGarcom,
      idMesa: this.#idMesa,
      dataAtendimento: this.#dataAtendimento
    };
  }
}
