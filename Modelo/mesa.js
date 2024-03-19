import MesaDAO from "../Persistencia/mesaDAO.js";

export default class Mesa {
  #MesaId;
  #Capacidade;

  constructor(MesaId = 0, Capacidade = 0) {
    this.#MesaId = MesaId;
    this.#Capacidade = Capacidade;
  }

  get MesaId() {
    return this.#MesaId;
  }

  set MesaId(newId) {
    this.#MesaId = newId;
  }



  get Capacidade() {
    return this.#Capacidade;
  }

  set Capacidade(newCapacidade) {
    this.#Capacidade = newCapacidade;
  }

  toJSON() {
    return {
      mesaId: this.#MesaId,
      capacidade: this.#Capacidade
    };
  // Método para converter o objeto Mesa em JSON

  }
  async gravar() {
    const mesaDAO = new MesaDAO();
    await mesaDAO.gravar(this.toJSON());
  }

  async excluir() {
    const mesaDAO = new MesaDAO();
    await mesaDAO.excluir(this.#MesaId);

  }
  async atualizar() {
    const mesaDAO = new MesaDAO();
    await mesaDAO.atualizar(this.MesaId, this.toJSON());
  }

  async consultar(termo) {
    const mesaDAO = new MesaDAO();
    await mesaDAO.consultar(termo);
  }
}
