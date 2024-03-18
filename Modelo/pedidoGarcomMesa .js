import PedidoGarcomMesaDAO from "../Persistencia/PedidoGarcomMesaDAO.js";

export default class PedidoGarcomMesa {
  #idPedido;
  #GarcomId;
  #idMesa;
  #dataAtendimento;

  constructor(GarcomId = 0, idGarcom = 0, idMesa = 0, dataAtendimento = new Date()) {
    this.#idPedido = idPedido;
    this.#GarcomId = GarcomId;
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
    return this.#GarcomId;
  }

  set idGarcom(newIdGarcom) {
    this.#GarcomId = newIdGarcom;
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
    const pgmDAO = new PedidoGarcomMesaDAO();
    await pgmDAO.gravar(this.toJSON());
  }

  async excluir() {
    const pgmDAO = new PedidoGarcomMesaDAO();
    await pgmDAO.excluir(this.#idPedido);
  }

  async atualizar() {
    const pgmDAO = new PedidoGarcomMesaDAO();
    await pgmDAO.atualizar(this.#idPedido, this.toJSON());
  }

  async consultar(termo) {
    const pgmDAO = new PedidoGarcomMesaDAO();
    return await pgmDAO.consultar(termo);
  }

  // Método para converter o objeto PedidoGarcomMesa em JSON
  toJSON() {
    return {
      idPedido: this.#idPedido,
      idGarcom: this.#GarcomId,
      idMesa: this.#idMesa,
      dataAtendimento: this.#dataAtendimento
    };
  }
}
