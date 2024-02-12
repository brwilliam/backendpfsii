import RestauranteDAO from "../Persistencia/restauranteDAO.js";

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

  // Método para converter o objeto Restaurante em JSON
  toJSON() {
    return {
      IDRestaurante: this.#IDRestaurante,
      NomeRestaurante: this.#NomeRestaurante
    };
  }

  // Camada de modelo acessa a camada de persistência
  async gravar() {
    const resDAO = new RestauranteDAO();
    await resDAO.gravar(this);
  }

  async excluir() {
    const resDAO = new RestauranteDAO();
    await resDAO.excluir(this);
  }

  async atualizar() {
    const resDAO = new RestauranteDAO();
    await resDAO.atualizar(this);
  }

  async consultar(parametro) {
    const resDAO = new RestauranteDAO();
    return await resDAO.consultar(parametro);
  }
}
