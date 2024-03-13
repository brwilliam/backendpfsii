import ClienteDAO from "../Persistencia/clienteDAO.js";

export default class Cliente {
  #idCliente;
  #nome;
  #telefone;
  #endereco;

  constructor(idCliente = 0, nome = '', telefone = '', endereco = '') {
    this.#idCliente = idCliente;
    this.#nome = nome;
    this.#telefone = telefone;
    this.#endereco = endereco;
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

  get telefone() {
    return this.#telefone;
  }

  set telefone(novoTelefone) {
    this.#telefone = novoTelefone;
  }

  get endereco() {
    return this.#endereco;
  }

  set endereco(novoEndereco) {
    this.#endereco = novoEndereco;
  }

  // Converte o objeto Cliente para o formato JSON
  toJSON() {
    return {
      idCliente: this.#idCliente,
      nome: this.#nome,
      telefone: this.#telefone,
      endereco: this.#endereco
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
