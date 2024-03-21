import PedidoGarcomMesa from "../Modelo/pedidoGarcomMesa.js";

export default class PedidoGarcomMesaCtrl {
  async gravar(request, response) {
    response.type("application/json");
    if (request.method === "POST" && request.is("application/json")) {
      const { PedidoId, GarcomId, MesaId } = request.body;

      if (PedidoId && GarcomId && MesaId) {
        const pedidoGarcomMesa = new PedidoGarcomMesa(PedidoId, GarcomId, MesaId);

        try {
          await pedidoGarcomMesa.gravar();
          response.status(200).json({
            status: true,
            mensagem: "Relação pedido-garçom-mesa incluída com sucesso!",
          });
        } catch (error) {
          response.status(500).json({
            status: false,
            mensagem: "Erro ao registrar a relação pedido-garçom-mesa: " + error.message,
          });
        }
      } else {
        response.status(400).json({
          status: false,
          mensagem: "Por favor, informe PedidoId, GarcomId e MesaId!",
        });
      }
    } else {
      response.status(400).json({
        status: false,
        mensagem: "Por favor, utilize o método POST para cadastrar uma relação pedido-garçom-mesa!",
      });
    }
  }

// Continuação da classe PedidoGarcomCtrl

async listarTodos(request, response) {
    response.type("application/json");
    try {
      const relacao = new PedidoGarcomMesa();
      const relacoes = await relacao.listarRelacoes();
      response.status(200).json({
        status: true,
        relacoes,
      });
    } catch (error) {
      response.status(500).json({
        status: false,
        mensagem: "Erro ao listar relações pedido-garçom-mesa: " + error.message,
      });
    }
  }
  
  async excluir(request, response) {
    response.type("application/json");
    const { PedidoId, GarcomId, MesaId } = request.body;
  
    if (PedidoId && GarcomId && MesaId) {
      const relacao = new PedidoGarcomMesa(PedidoId, GarcomId, MesaId);
      try {
        await relacao.excluir();
        response.status(200).json({
          status: true,
          mensagem: "Relação pedido-garçom-mesa excluída com sucesso!",
        });
      } catch (error) {
        response.status(500).json({
          status: false,
          mensagem: "Erro ao excluir relação pedido-garçom-mesa: " + error.message,
        });
      }
    } else {
      response.status(400).json({
        status: false,
        mensagem: "Por favor, informe PedidoId, GarcomId, e MesaId!",
      });
    }
  }
  }
