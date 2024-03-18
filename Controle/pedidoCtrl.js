import Pedido from "../Modelo/pedido.js";
import GarcomMesa from "../Modelo/garcomMesa.js";

export default class PedidoCtrl {
  async gravar(requisicao, resposta) {
    resposta.type("application/json");
    if (requisicao.method === "POST" && requisicao.is("application/json")) {
      const dados = requisicao.body;
      const dataPedido = dados.DataPedido;
      const valorTotal = dados.ValorTotal;
      const restauranteID = dados.Restaurante;
      const garcomMesa = dados.GarcomMesa; // Corrigido para GarcomMesa

      if (dataPedido && valorTotal > 0 && garcomMesa && restauranteID) {
        const GarcomId = garcomMesa.GarcomId;
        const MesaId = garcomMesa.MesaId;

        const pedido = new Pedido(0, dataPedido, valorTotal, restauranteID, GarcomId, MesaId);

        try {
          await pedido.gravar();
          resposta.status(200).json({
            status: true,
            mensagem: "Pedido incluído com sucesso!",
          });
        } catch (erro) {
          resposta.status(500).json({
            status: false,
            mensagem: "Erro ao registrar o pedido: " + erro.message,
          });
        }
      } else {
        resposta.status(400).json({
          status: false,
          mensagem:
            "Por favor, forneça os dados do pedido conforme a documentação da API!",
        });
      }
    } else {
      resposta.status(400).json({
        status: false,
        mensagem: "Por favor, utilize o método POST para cadastrar um pedido!",
      });
    }
  }




  async atualizar(requisicao, resposta) {
    resposta.type("application/json");
    if (
      (requisicao.method === "PUT" || requisicao.method === "PATCH") &&
      requisicao.is("application/json")
    ) {
      const dados = requisicao.body;
      const idPedido = dados.IDPedido;
      const dataPedido = dados.DataPedido;
      const restaurante = dados.Restaurante;
      const valorTotal = dados.ValorTotal;
      const garcomMesa = dados.garcomMesa;

      if (idPedido && dataPedido && valorTotal > 0 && garcomMesa && restaurante) {
        const garcomID = garcomMesa.GarcomID;
        const mesaID = garcomMesa.MesaID;

        const pedido = new Pedido(
          idPedido,
          dataPedido,
          valorTotal,
          restaurante,
          garcomID,
          mesaID
        );

        try {
          await pedido.atualizar();
          resposta.status(200).json({
            status: true,
            mensagem: "Pedido atualizado com sucesso!",
          });
        } catch (erro) {
          resposta.status(500).json({
            status: false,
            mensagem: "Erro ao atualizar o pedido: " + erro.message,
          });
        }
      } else {
        resposta.status(400).json({
          status: false,
          mensagem:
            "Por favor, informe todos os dados do pedido conforme a documentação da API!",
        });
      }
    } else {
      resposta.status(400).json({
        status: false,
        mensagem:
          "Por favor, utilize os métodos PUT ou PATCH para atualizar um pedido!",
      });
    }
  }

  async excluir(requisicao, resposta) {
    resposta.type("application/json");
    if (requisicao.method === "DELETE" && requisicao.is("application/json")) {
      const dados = requisicao.body;
      const idPedido = dados.PedidoID;

      if (idPedido) {
        const pedido = new Pedido(idPedido);

        try {
          await pedido.excluir();
          resposta.status(200).json({
            status: true,
            mensagem: "Pedido excluído com sucesso!",
          });
        } catch (erro) {
          resposta.status(500).json({
            status: false,
            mensagem: "Erro ao excluir o pedido: " + erro.message,
          });
        }
      } else {
        resposta.status(400).json({
          status: false,
          mensagem: "Por favor, informe o ID do pedido!",
        });
      }
    } else {
      resposta.status(400).json({
        status: false,
        mensagem: "Por favor, utilize o método DELETE para excluir um pedido!",
      });
    }
  }

  async consultar(requisicao, resposta) {
    resposta.type("application/json");
    let termo = requisicao.params.termo;
    if (!termo) {
      termo = "";
    }
    if (requisicao.method === "GET") {
      const pedido = new Pedido();
      try {
        const listaPedidos = await pedido.consultar(termo);
        resposta.json({
          status: true,
          listaPedidos,
        });
      } catch (erro) {
        resposta.json({
          status: false,
          mensagem: "Não foi possível obter os pedidos: " + erro.message,
        });
      }
    } else {
      resposta.status(400).json({
        status: false,
        mensagem: "Por favor, utilize o método GET para consultar pedidos!",
      });
    }
  }
}
