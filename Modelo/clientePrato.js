import ClientePratoDAO from "../Persistencia/clientePratoDAO.js";

export default class ClientePrato {
  #idClientePrato;
  #clienteID;
  #pratoID;
  #quantidade;

  constructor(idClientePrato = 0, clienteID, pratoID, quantidade = 1) {
    this.#idClientePrato = idClientePrato;
    this.#clienteID = clienteID;
    this.#pratoID = pratoID;
    this.#quantidade = quantidade;
  }

  get idClientePrato() {
    return this.#idClientePrato;
  }

  set idClientePrato(novoIdClientePrato) {
    this.#idClientePrato = novoIdClientePrato;
  }

  get clienteID() {
    return this.#clienteID;
  }

  set clienteID(novoClienteID) {
    this.#clienteID = novoClienteID;
  }

  get pratoID() {
    return this.#pratoID;
  }

  set pratoID(novoPratoID) {
    this.#pratoID = novoPratoID;
  }

  get quantidade() {
    return this.#quantidade;
  }

  set quantidade(novaQuantidade) {
    this.#quantidade = novaQuantidade;
  }

  async adicionar() {
    const clientePratoDAO = new ClientePratoDAO();
    await clientePratoDAO.adicionar(this);
  }

  async remover() {
    const clientePratoDAO = new ClientePratoDAO();
    await clientePratoDAO.remover(this);
  }

  static async consultarPratosDoCliente(clienteID) {
    const clientePratoDAO = new ClientePratoDAO();
    return await clientePratoDAO.consultarPratosDoCliente(clienteID);
  }

  static async consultarClientesDoPrato(pratoID) {
    const clientePratoDAO = new ClientePratoDAO();
    return await clientePratoDAO.consultarClientesDoPrato(pratoID);
  }

  toJSON() {
    return {
      idClientePrato: this.#idClientePrato,
      clienteID: this.#clienteID,
      pratoID: this.#pratoID,
      quantidade: this.#quantidade,
    };
  }
}
