import PedidoDAO from "../Persistencia/pedidoDAO.js";

export default class Pedido {
  #IDPedido;
  #DataPedido;
  #ValorTotal;
  #GarcomID; // Adicionando GarcomID
  #MesaID; // Adicionando MesaID

  constructor(
    IDPedido = 0,
    DataPedido = '',
    ValorTotal = 0,
    GarcomID = 0,
    MesaID = 0
  ) {
    this.#IDPedido = IDPedido; // O ID será gerado automaticamente pelo banco de dados
    this.#DataPedido = DataPedido;
    this.#ValorTotal = ValorTotal;
    this.#GarcomID = GarcomID;
    this.#MesaID = MesaID;
  }

  get IDPedido() {
    return this.#IDPedido;
  }

  set IDPedido(novoIDPedido) {
    this.#IDPedido = novoIDPedido;
  }

  get DataPedido() {
    return this.#DataPedido;
  }

  set DataPedido(novaDataPedido) {
    this.#DataPedido = novaDataPedido;
  }

  get ValorTotal() {
    return this.#ValorTotal;
  }

  set ValorTotal(novoValorTotal) {
    this.#ValorTotal = novoValorTotal;
  }

  get GarcomID() {
    return this.#GarcomID;
  }

  set GarcomID(novoGarcomID) {
    this.#GarcomID = novoGarcomID;
  }

  get MesaID() {
    return this.#MesaID;
  }

  set MesaID(novaMesaID) {
    this.#MesaID = novaMesaID;
  }

  // Método para converter o objeto Pedido em JSON
  toJSON() {
    return {
      IDPedido: this.#IDPedido,
      DataPedido: this.#DataPedido,
      ValorTotal: this.#ValorTotal,
      GarcomID: this.#GarcomID,
      MesaID: this.#MesaID
    };
  }

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

  async consultar(termo) {
    const pedDAO = new PedidoDAO();
    return await pedDAO.consultar(termo);
  }
}
