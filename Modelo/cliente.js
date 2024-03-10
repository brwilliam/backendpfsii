import ClienteDAO from "../Persistencia/clienteDAO.js";

export default class Cliente {
  #idCliente;
  #nome;
  #email;

  constructor(idCliente = 0, nome = '', email = '') {
    this.#idCliente = idCliente;
    this.#nome = nome;
    this.#email = email;
  }

  get idCliente() {
    return this.#idCliente;
  }

  set idCliente(novoIdCliente) {
    this.#idCliente = novoIdCliente;
  }

  get nome() {
    return this.#nome;
  }

  set nome(novoNome) {
    this.#nome = novoNome;
  }

  get email() {
    return this.#email;
  }

  set email(novoEmail) {
    this.#email = novoEmail;
  }

  // Converte o objeto Cliente para o formato JSON
  toJSON() {
    return {
      idCliente: this.#idCliente,
      nome: this.#nome,
      email: this.#email
    };
  }

  async gravar() {
    const clienteDAO = new ClienteDAO();
    await clienteDAO.gravar(this);
  }

  async excluir() {
    const clienteDAO = new ClienteDAO();
    await clienteDAO.excluir(this);
  }

  async atualizar() {
    const clienteDAO = new ClienteDAO();
    await clienteDAO.atualizar(this);
  }

  async consultar(termo) {
    const clienteDAO = new ClienteDAO();
    return await clienteDAO.consultar(termo);
  }
}
