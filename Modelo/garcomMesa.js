import GarcomMesaDAO from "../Persistencia/garcomMesaDAO.js";

export default class GarcomMesa {
  #GarcomId;
  #mesaID;
  #dataAtendimento;

  constructor(garcomID = 0, mesaID = 0, dataAtendimento = '') {
    this.#GarcomId = garcomID;
    this.#mesaID = mesaID;
    this.#dataAtendimento = dataAtendimento;
  }

  get garcomID() {
    return this.#GarcomId;
  }

  set garcomID(novoGarcomID) {
    this.#GarcomId = novoGarcomID;
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
      garcomID: this.#GarcomId,
      mesaID: this.#mesaID,
      dataAtendimento: this.#dataAtendimento
    };
  }

  async gravar() {
    const pedDAO = new GarcomMesaDAO();
    await pedDAO.gravar(this.toJSON());
  }

  async excluir() {
    const pedDAO = new GarcomMesaDAO();
    await pedDAO.excluir(this.#GarcomId, this.#mesaID);
  }

  async atualizar() {
    const pedDAO = new GarcomMesaDAO();
    await pedDAO.atualizar(this.#GarcomId, this.#mesaID, this.toJSON());
  }

  async consultar(termo) {
    const pedDAO = new GarcomMesaDAO();
    return await pedDAO.consultar(termo);
  }
}