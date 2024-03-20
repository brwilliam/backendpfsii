import GarcomMesaDAO from "../Persistencia/garcomMesaDAO.js";

export default class GarcomMesa {
  #GarcomId;
  #MesaId;

  constructor(GarcomId = 0, MesaId = 0) {
    this.#GarcomId = GarcomId;
    this.#MesaId = MesaId;
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
    const mesaDAO = new GarcomMesaDAO();
    const garcomMesa = { GarcomId: this.#GarcomId, MesaId: this.#MesaId };
    await mesaDAO.gravar(garcomMesa);
}

  async consultarGarconsDaMesa(GarcomId) {
    const mesaDAO = new GarcomMesaDAO();
    return await mesaDAO.consultarGarconsDaMesa(GarcomId);
  }

  async consultarMesasDoGarcom(MesaId) {
    const mesaDAO = new GarcomMesaDAO();
    return await mesaDAO.consultarMesasDoGarcom(MesaId);
  }

  async listarRelacoes() {
    const dao = new GarcomMesaDAO();
    return await dao.listarRelacoes();
  }

}
