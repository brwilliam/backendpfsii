import PedidoDAO from "../Persistencia/pedidoDAO.js";

export default class Pedido {
  #IDPedido;
  #DataPedido;
  #ValorTotal;
  #RestauranteID;
  #GarcomId;
  #MesaId;

  constructor(
    IDPedido = 0,
    DataPedido = "",
    ValorTotal = 0,
    RestauranteID = 0,
    GarcomId = 0,
    MesaId = 0
  ) {
    this.#IDPedido = IDPedido;
    this.#DataPedido = DataPedido;
    this.#ValorTotal = ValorTotal;
    this.#RestauranteID = RestauranteID;
    this.#GarcomId = GarcomId;
    this.#MesaId = MesaId;
  }

  // Getters e setters
  get IDPedido() {
    return this.#IDPedido;
  }

  get DataPedido() {
    return this.#DataPedido;
  }

  get ValorTotal() {
    return this.#ValorTotal;
  }

  get RestauranteID() {
    return this.#RestauranteID;
  }

  get GarcomId() {
    return this.#GarcomId;
  }

  get MesaId() {
    return this.#MesaId;
  }

  set IDPedido(value) {
    this.#IDPedido = value;
  }

  set DataPedido(value) {
    this.#DataPedido = value;
  }

  set ValorTotal(value) {
    this.#ValorTotal = value;
  }

  set RestauranteID(value) {
    this.#RestauranteID = value;
  }

  set GarcomId(value) {
    this.#GarcomId = value;
  }

  set MesaId(value) {
    this.#MesaId = value;
  }

  // Método toJSON
  toJSON() {
    return {
      IDPedido: this.#IDPedido,
      DataPedido: this.#DataPedido,
      ValorTotal: this.#ValorTotal,
      RestauranteID: this.#RestauranteID,
      GarcomId: this.#GarcomId,
      MesaId: this.#MesaId
    };
  }

  async gravar() {
    const pedDAO = new PedidoDAO();
    try {
      if (!(this instanceof Pedido)) {
        throw new Error("O objeto fornecido não é uma instância de Pedido.");
      }
      await pedDAO.gravar(this);
    } catch (error) {
      throw new Error(`Erro ao gravar pedido no banco de dados: ${error.message}`);
    }
  }

  async excluir() {
    const pedDAO = new PedidoDAO();
    try {
      if (!(this instanceof Pedido)) {
        throw new Error("O objeto fornecido não é uma instância de Pedido.");
      }
      await pedDAO.excluir(this);
    } catch (error) {
      throw new Error(`Erro ao excluir pedido no banco de dados: ${error.message}`);
    }
  }

  async atualizar() {
    const pedDAO = new PedidoDAO();
    try {
      if (!(this instanceof Pedido)) {
        throw new Error("O objeto fornecido não é uma instância de Pedido.");
      }
      await pedDAO.atualizar(this);
    } catch (error) {
      throw new Error(`Erro ao atualizar pedido no banco de dados: ${error.message}`);
    }
  }

  async consultar(termo) {
    const pedDAO = new PedidoDAO();
    try {
      return await pedDAO.consultar(termo);
    } catch (error) {
      throw new Error(`Erro ao consultar pedidos no banco de dados: ${error.message}`);
    }
  }
}
