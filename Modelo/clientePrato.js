import ClientePratoDAO from "../Persistencia/clientePratoDAO.js";

export default class ClientePrato {
  #clienteID;
  #pratoID;

  constructor(clienteID, pratoID) {
    this.#clienteID = clienteID;
    this.#pratoID = pratoID;
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

  // Não há necessidade de uma representação JSON direta para esta classe em muitos casos,
  // mas poderia ser útil dependendo da implementação da API ou da interface de usuário.
  toJSON() {
    return {
      clienteID: this.#clienteID,
      pratoID: this.#pratoID,
    };
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
}
