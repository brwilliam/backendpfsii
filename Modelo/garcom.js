import PedidoDAO from "../Persistencia/pedidoDAO.js";

export default class Garcom {
  #garcomID;
  #nome;
  #telefone;

  constructor(garcomID = 0, nome = '', telefone = '') {
    this.#garcomID = garcomID;
    this.#nome = nome;
    this.#telefone = telefone;
  }

  get garcomID() {
    return this.#garcomID;
  }

  set garcomID(novoGarcomID) {
    this.#garcomID = novoGarcomID;
  }

  get nome() {
    return this.#nome;
  }

  set nome(novoNome) {
    this.#nome = novoNome;
  }

  get telefone() {
    return this.#telefone;
  }

  set telefone(novoTelefone) {
    this.#telefone = novoTelefone;
  }

  // Método para converter o objeto Garcom em JSON
  toJSON() {
    return {
      garcomID: this.#garcomID,
      nome: this.#nome,
      telefone: this.#telefone
    };
  }

  async gravar() {
    const pedDAO = new PedidoDAO();
    await pedDAO.gravarGarcom(this.toJSON());
  }

  async excluir() {
    const pedDAO = new PedidoDAO();
    await pedDAO.excluirGarcom(this.#garcomID);
  }

  async atualizar() {
    const pedDAO = new PedidoDAO();
    await pedDAO.atualizarGarcom(this.#garcomID, this.toJSON());
  }

  async consultar(termo) {
    const pedDAO = new PedidoDAO();
    return await pedDAO.consultarGarcom(termo);
  }
}