import PedidoDAO from "../Persistencia/pedidoDAO.js";

export default class GarcomMesa {
  #garcomID;
  #mesaID;
  #dataAtendimento;

  constructor(garcomID = 0, mesaID = 0, dataAtendimento = '') {
    this.#garcomID = garcomID;
    this.#mesaID = mesaID;
    this.#dataAtendimento = dataAtendimento;
  }

  get garcomID() {
    return this.#garcomID;
  }

  set garcomID(novoGarcomID) {
    this.#garcomID = novoGarcomID;
  }

  get mesaID() {
    return this.#mesaID;
  }

  set mesaID(novoMesaID) {
    this.#mesaID = novoMesaID;
  }

  get dataAtendimento() {
    return this.#dataAtendimento;
  }

  set dataAtendimento(novaDataAtendimento) {
    this.#dataAtendimento = novaDataAtendimento;
  }

  // Método para converter o objeto GarcomMesa em JSON
  toJSON() {
    return {
      garcomID: this.#garcomID,
      mesaID: this.#mesaID,
      dataAtendimento: this.#dataAtendimento
    };
  }

  async gravar() {
    const pedDAO = new PedidoDAO();
    await pedDAO.gravarGarcomMesa(this.toJSON());
  }

  async excluir() {
    const pedDAO = new PedidoDAO();
    await pedDAO.excluirGarcomMesa(this.#garcomID, this.#mesaID);
  }

  async atualizar() {
    const pedDAO = new PedidoDAO();
    await pedDAO.atualizarGarcomMesa(this.#garcomID, this.#mesaID, this.toJSON());
  }

  async consultar(termo) {
    const pedDAO = new PedidoDAO();
    return await pedDAO.consultarGarcomMesa(termo);
  }
}