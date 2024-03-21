import Pedido from "../Modelo/pedido.js";

export default class PedidoCtrl {
  async gravar(request, response) {
    response.type("application/json");
    if (request.method === "POST" && request.is("application/json")) {
      const { DataPedido, IdRestaurante } = request.body;

      if (DataPedido && IdRestaurante) {
        const pedido = new Pedido(0, DataPedido, IdRestaurante); // Assume que PedidoId é autoincrement

        try {
          await pedido.gravar();
          response.status(200).json({
            status: true,
            mensagem: "Pedido incluído com sucesso!",
          });
        } catch (error) {
          response.status(500).json({
            status: false,
            mensagem: "Erro ao registrar o pedido: " + error.message,
          });
        }
      } else {
        response.status(400).json({
          status: false,
          mensagem: "Por favor, informe DataPedido e IdRestaurante!",
        });
      }
    } else {
      response.status(400).json({
        status: false,
        mensagem: "Por favor, utilize o método POST para cadastrar um pedido!",
      });
    }
  }

// Continuação da classe PedidoCtrl

async listarTodos(request, response) {
    response.type("application/json");
    try {
      const pedido = new Pedido();
      const pedidos = await pedido.listarPedidos();
      response.status(200).json({
        status: true,
        pedidos,
      });
    } catch (error) {
      response.status(500).json({
        status: false,
        mensagem: "Erro ao listar pedidos: " + error.message,
      });
    }
  }
  
  async excluir(request, response) {
    response.type("application/json");
    const { PedidoId } = request.body;
  
    if (PedidoId) {
      const pedido = new Pedido(PedidoId);
      try {
        await pedido.excluir();
        response.status(200).json({
          status: true,
          mensagem: "Pedido excluído com sucesso!",
        });
      } catch (error) {
        response.status(500).json({
          status: false,
          mensagem: "Erro ao excluir pedido: " + error.message,
        });
      }
    } else {
      response.status(400).json({
        status: false,
        mensagem: "Por favor, informe PedidoId!",
      });
    }
  }
  }
