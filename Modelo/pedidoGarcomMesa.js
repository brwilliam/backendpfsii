import PedidoGarcomMesaDAO from "../Persistencia/pedidoGarcomMesaDAO.js";

export default class PedidoGarcomMesa {
  #PedidoId;
  #GarcomId;
  #MesaId;

  constructor(PedidoId = 0, GarcomId = 0, MesaId = 0) {
    this.#PedidoId = PedidoId;
    this.#GarcomId = GarcomId;
    this.#MesaId = MesaId;
  }

  get PedidoId() {
    return this.#PedidoId;
  }

  set PedidoId(newId) {
    this.#PedidoId = newId;
  }

  get GarcomId() {
    return this.#GarcomId;
  }

  set GarcomId(newId) {
    this.#GarcomId = newId;
  }

  get MesaId() {
    return this.#MesaId;
  }

  set MesaId(newId) {
    this.#MesaId = newId;
  }

  async gravar() {
    const dao = new PedidoGarcomMesaDAO();
    const relacao = { PedidoId: this.#PedidoId, GarcomId: this.#GarcomId, MesaId: this.#MesaId };
    await dao.gravar(relacao);
  }

  async listarRelacoes() {
    const dao = new PedidoGarcomMesaDAO();
    return await dao.listarRelacoes();
  }
  
  async excluir() {
    const dao = new PedidoGarcomMesaDAO();
    await dao.excluir(this);
  }
}
