// Importação da classe GarcomDAO
import GarcomDAO from "../Persistencia/garcomDAO.js";

export default class Garcom {
  #GarcomId;
  #nome;
  #telefone;

  constructor(GarcomId = 0, nome = '', telefone = '') {
    this.#GarcomId = GarcomId;
    this.#nome = nome;
    this.#telefone = telefone;
  }

  get GarcomId() {
    return this.#GarcomId;
  }

  set GarcomId(novoGarcomID) {
    this.#GarcomId = novoGarcomID;
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
      garcomID: this.#GarcomId,
      nome: this.#nome,
      telefone: this.#telefone
    };
  }

  async gravar() {
    const garcomDAO = new GarcomDAO();
    try {
      await garcomDAO.gravar(this);
    } catch (error) {
      console.error(error.message);
    }
  }

  async excluir() {
    const garcomDAO = new GarcomDAO();
    try {
      await garcomDAO.excluir(this);
    } catch (error) {
      console.error(error.message);
    }
  }

  async atualizar() {
    const garcomDAO = new GarcomDAO();
    try {
      await garcomDAO.atualizar(this);
    } catch (error) {
      console.error(error.message);
    }
  }

  async consultar() {
    const garcomDAO = new GarcomDAO();
    try {
      return await garcomDAO.consultar();
    } catch (error) {
      console.error(error.message);
    }
  } 

  async consultarPorId() {
    const garcomDAO = new GarcomDAO();
    try {
      return await garcomDAO.consultarPorId(this);
    } catch (error) {
      console.error(error.message);
    }
  }
}