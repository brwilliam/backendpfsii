import PratoDAO from "../Persistencia/pratoDAO.js";
import Cliente from "./cliente.js";

export default class Prato {
  #pratoID;
  #cliente;
  #nome;
  #preco;
 

  constructor(pratoID = 0,cliente , nome = '', preco = 0.0, ) {
    this.#pratoID = pratoID;
    this.#cliente = cliente;
    this.#nome = nome;
    this.#preco = preco;
    
  }

  get pratoID() {
    return this.#pratoID;
  }

  set pratoID(novoPratoID) {
    this.#pratoID = novoPratoID;
  }

  get cliente() {
    return this.#cliente;
  }

  set cliente(novoCliente) {
    this.#cliente = novoCliente;
  }

  get nome() {
    return this.#nome;
  }

  set nome(novoNome) {
    this.#nome = novoNome;
  }

  get preco() {
    return this.#preco;
  }

  set preco(novoPreco) {
    this.#preco = novoPreco;
  }
  

  // Converte o objeto Prato para o formato JSON
  toJSON() {
    return {
      pratoID: this.#pratoID,
      cliente:this.#cliente,
      nome: this.#nome,
      preco: this.#preco
    };
  }

  async gravar() {
    const pratoDAO = new PratoDAO();
    await pratoDAO.gravar(this);
  }

  async excluir() {
    const pratoDAO = new PratoDAO();
    await pratoDAO.excluir(this);
  }

  async atualizar() {
    const pratoDAO = new PratoDAO();
    await pratoDAO.atualizar(this);
  }

  async consultar(termo) {
    const pratoDAO = new PratoDAO();
    return await pratoDAO.consultar(termo);
  }
}
