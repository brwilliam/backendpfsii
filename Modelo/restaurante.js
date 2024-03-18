import RestauranteDAO from "../Persistencia/restauranteDAO.js";

export default class Restaurante {
  // Definição dos atributos privados
  #RestauranteID;
  #NomeRestaurante;

  constructor(
    RestauranteID = 0,
    NomeRestaurante = ""
  ) {
    this.#RestauranteID = RestauranteID;
    this.#NomeRestaurante = NomeRestaurante;
  }

  // Métodos de acesso públicos
  get RestauranteID() {
    return this.#RestauranteID;
  }

  set RestauranteID(novoID) {
    this.#RestauranteID = novoID;
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
      RestauranteID: this.#RestauranteID,
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
