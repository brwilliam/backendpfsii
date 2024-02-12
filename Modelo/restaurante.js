import PedidoDAO from "../Persistencia/pedidoDAO.js";

export default class Restaurante {
  // Definição dos atributos privados
  #IDRestaurante;
  #NomeRestaurante;


  constructor(
    IDRestaurante = 0,
    NomeRestaurante = ""
  ) {
    this.#IDRestaurante = IDRestaurante;
    this.#NomeRestaurante = NomeRestaurante;

  }

  // Métodos de acesso públicos

  get IDRestaurante() {
    return this.#IDRestaurante;
  }

  set IDRestaurante(novoID) {
    this.#IDRestaurante = novoID;
  }

  get NomeRestaurante() {
    return this.#NomeRestaurante;
  }

  set NomeRestaurante(novoNome) {
    this.#NomeRestaurante = novoNome;
  }


  // Camada de modelo acessa a camada de persistência
  async gravar() {
    const pedDAO = new PedidoDAO();
    await pedDAO.gravar(this);
  }

  async excluir() {
    const pedDAO = new PedidoDAO();
    await pedDAO.excluir(this);
  }

  async atualizar() {
    const pedDAO = new PedidoDAO();
    await pedDAO.atualizar(this);
  }

  async consultar(parametro) {
    const pedDAO = new PedidoDAO();
    return await pedDAO.consultar(parametro);
  }
}
