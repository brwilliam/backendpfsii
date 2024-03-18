import GarcomMesaDAO from "../Persistencia/garcomMesaDAO.js";

export default class GarcomMesa {
  #GarcomId;
  #mesaID;
  #dataAtendimento;

  constructor(GarcomId = 0, mesaID = 0, dataAtendimento = '') {
    this.#GarcomId = GarcomId;
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
    const gmDAO = new GarcomMesaDAO();
    await gmDAO.gravar(this);
  }

  async excluir() {
    const gmDAO = new GarcomMesaDAO();
    await gmDAO.excluir(this);
  }

  async atualizar() {
    const gmDAO = new GarcomMesaDAO();
    await gmDAO.atualizar(this);
  }

  async consultar(termo) {
    const gmDAO = new GarcomMesaDAO();
    return await gmDAO.consultar(termo);
  }
}