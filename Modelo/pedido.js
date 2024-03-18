import PedidoDAO from "../Persistencia/pedidoDAO.js";

export default class Pedido {
  #IDPedido;
  #DataPedido;
  #ValorTotal;
  #Restaurante;
  #Garcom;
  #Mesa;

  constructor(
    IDPedido = 0,
    DataPedido = "",
    ValorTotal = 0,
    Restaurante = {} ,
    Garcom = {},
    Mesa = {}
  ) {
    this.#IDPedido = IDPedido;
    this.#DataPedido = DataPedido;
    this.#ValorTotal = ValorTotal;
    this.#Restaurante = Restaurante;
    this.#Garcom = Garcom;
    this.#Mesa = Mesa;
  }

  // Getters e setters 
   // Getters
 get IDPedido() {
  return this.#IDPedido;
}

get DataPedido() {
  return this.#DataPedido;
}

get ValorTotal() {
  return this.#ValorTotal;
}

get Restaurante() {
  return this.#Restaurante;
}

get Garcom() {
  return this.#Garcom;
}

get Mesa() {
  return this.#Mesa;
}

// Setters
set IDPedido(value) {
  this.#IDPedido = value;
}

set DataPedido(value) {
  this.#DataPedido = value;
}

set ValorTotal(value) {
  this.#ValorTotal = value;
}

set Restaurante(value) {
  this.#Restaurante = value;
}

set Garcom(value) {
  this.#Garcom = value;
}

set Mesa(value) {
  this.#Mesa = value;
}


  // Método toJSON atualizado 
  toJSON() {
    return {
      IDPedido: this.#IDPedido,
      DataPedido: this.#DataPedido,
      ValorTotal: this.#ValorTotal,
      Restaurante: this.#Restaurante, 
      Garcom: this.#Garcom,
      Mesa: this.#Mesa,
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
