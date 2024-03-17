import PedidoDAO from "../Persistencia/pedidoDAO.js";

export default class Pedido {
  #IDPedido;
  #DataPedido;
  #ValorTotal;
  #Restaurante;
  #GarcomID;
  #MesaID;

  constructor(
    IDPedido = 0,
    DataPedido = "",
    ValorTotal = 0,
    Restaurante = {} ,
    GarcomID = 0,
    MesaID = 0
  ) {
    this.#IDPedido = IDPedido;
    this.#DataPedido = DataPedido;
    this.#ValorTotal = ValorTotal;
    this.#Restaurante = Restaurante;
    this.#GarcomID = GarcomID;
    this.#MesaID = MesaID;
  }

  // Getters e setters 

  // Método toJSON atualizado 
  toJSON() {
    return {
      IDPedido: this.#IDPedido,
      DataPedido: this.#DataPedido,
      ValorTotal: this.#ValorTotal,
      Restaurante: this.#Restaurante, 
      GarcomID: this.#GarcomID,
      MesaID: this.#MesaID,
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
