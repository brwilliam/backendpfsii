import PedidoDAO from "../Persistencia/pedidoDAO.js";

export default class Mesa {
  #mesaID;
  #numero;
  #capacidade;

  constructor(mesaID = 0, numero = '', capacidade = 0) {
    this.#mesaID = mesaID; // O ID será gerado automaticamente pelo banco de dados
    this.#numero = numero;
    this.#capacidade = capacidade;
  }

  get mesaID() {
    return this.#mesaID;
  }

  set mesaID(novoMesaID) {
    this.#mesaID = novoMesaID;
  }

  get numero() {
    return this.#numero;
  }

  set numero(novoNumero) {
    this.#numero = novoNumero;
  }

  get capacidade() {
    return this.#capacidade;
  }

  set capacidade(novaCapacidade) {
    this.#capacidade = novaCapacidade;
  }

  // Método para converter o objeto Mesa em JSON
  toJSON() {
    return {
      mesaID: this.#mesaID,
      numero: this.#numero,
      capacidade: this.#capacidade
    };
  }

  async gravar() {
    const mesaDAO = new PedidoDAO();
    await mesaDAO.gravar(this.toJSON());
  }

  async excluir() {
    const mesaDAO = new PedidoDAO();
    await mesaDAO.excluir(this.#mesaID);
  }

  async atualizar() {
    const mesaDAO = new PedidoDAO();
    await mesaDAO.atualizar(this.#mesaID, this.toJSON());
  }

  async consultar(termo) {
    const mesaDAO = new PedidoDAO();
    await mesaDAO.consultar(termo);
  }
}
