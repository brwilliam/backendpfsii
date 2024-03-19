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

  get pedidoId() {
    return this.#idPedido;
  }

  set id(newId) {
    this.#idPedido = newId;
  }

  get idPedido() {
    return this.#idPedido;
  }

  get garcomId_() {
    return this.#GarcomId;
  }

  set garcomId(newGarcomId) {
    this.#GarcomId = newGarcomId;
  }

  get mesaId() {
    return this.#idMesa;
  }

  set mesaId(newMesaId) {
    this.#idMesa = newMesaId;
  }

  get dataAtendimento() {
    return this.#dataAtendimento;
  }

  set dataAtendimento(dataAtendimento) {
    this.#dataAtendimento = dataAtendimento;
  }

  async salvar() {
    const pgmDAO = new PedidoGarcomMesaDAO();
    await pgmDAO.salvar(this.toJSON());
  }

  async excluir() {
    const pgmDAO = new PedidoGarcomMesaDAO();
    await pgmDAO.excluir(this.id);
  }

  async atualizar() {
    const pgmDAO = new PedidoGarcomMesaDAO();
    await pgmDAO.atualizar(this.id, this.toJSON());
  }

  async consultar(termo) {
    const pgmDAO = new PedidoGarcomMesaDAO();
    return await pgmDAO.consultar(termo);
  }

  toJSON() {
    return {
      id: this.id,
      garcomId: this.garcomId,
      mesaId: this.mesaId,
      dataAtendimento: this.dataAtendimento
    };
}
}