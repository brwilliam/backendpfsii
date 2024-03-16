import PedidoGarcomMesaDAO from "../Persistencia/pedidoGarcomMesaDAO.js";

export default class PedidoGarcomMesaCtrl {
  async gravar(requisicao, resposta) {
    resposta.type("application/json");
    if (requisicao.method === "POST" && requisicao.is("application/json")) {
      const dados = requisicao.body;
      const idGarcom = dados.idGarcom;
      const idMesa = dados.idMesa;
      const dataAtendimento = dados.dataAtendimento;

      if (idGarcom && idMesa && dataAtendimento) {
        const pedidoGarcomMesa = {
          idGarcom: idGarcom,
          idMesa: idMesa,
          dataAtendimento: dataAtendimento
        };

        try {
          const pedidoGarcomMesaDAO = new PedidoGarcomMesaDAO();
          await pedidoGarcomMesaDAO.gravar(pedidoGarcomMesa);
          resposta.status(200).json({
            status: true,
            mensagem: "Pedido do garçom para mesa incluído com sucesso!",
          });
        } catch (erro) {
          resposta.status(500).json({
            status: false,
            mensagem: "Erro ao registrar o pedido do garçom para mesa: " + erro.message,
          });
        }
      } else {
        resposta.status(400).json({
          status: false,
          mensagem:
            "Por favor, forneça os dados do pedido do garçom para mesa conforme a documentação da API!",
        });
      }
    } else {
      resposta.status(400).json({
        status: false,
        mensagem: "Por favor, utilize o método POST para cadastrar um pedido do garçom para mesa!",
      });
    }
  }

  async excluir(requisicao, resposta) {
    resposta.type("application/json");
    if (requisicao.method === "DELETE" && requisicao.is("application/json")) {
      const idPedido = requisicao.params.idPedido;

      if (idPedido) {
        try {
          const pedidoGarcomMesaDAO = new PedidoGarcomMesaDAO();
          await pedidoGarcomMesaDAO.excluir(idPedido);
          resposta.status(200).json({
            status: true,
            mensagem: "Pedido do garçom para mesa excluído com sucesso!",
          });
        } catch (erro) {
          resposta.status(500).json({
            status: false,
            mensagem: "Erro ao excluir o pedido do garçom para mesa: " + erro.message,
          });
        }
      } else {
        resposta.status(400).json({
          status: false,
          mensagem: "Por favor, informe o ID do pedido do garçom para mesa!",
        });
      }
    } else {
      resposta.status(400).json({
        status: false,
        mensagem: "Por favor, utilize o método DELETE para excluir um pedido do garçom para mesa!",
      });
    }
  }

  async atualizar(requisicao, resposta) {
    resposta.type("application/json");
    if (
      (requisicao.method === "PUT" || requisicao.method === "PATCH") &&
      requisicao.is("application/json")
    ) {
      const idPedido = requisicao.params.idPedido;
      const dados = requisicao.body;
      const idGarcom = dados.idGarcom;
      const idMesa = dados.idMesa;
      const dataAtendimento = dados.dataAtendimento;

      if (idPedido && idGarcom && idMesa && dataAtendimento) {
        const pedidoGarcomMesa = {
          idGarcom: idGarcom,
          idMesa: idMesa,
          dataAtendimento: dataAtendimento
        };

        try {
          const pedidoGarcomMesaDAO = new PedidoGarcomMesaDAO();
          await pedidoGarcomMesaDAO.atualizar(idPedido, pedidoGarcomMesa);
          resposta.status(200).json({
            status: true,
            mensagem: "Pedido do garçom para mesa atualizado com sucesso!",
          });
        } catch (erro) {
          resposta.status(500).json({
            status: false,
            mensagem: "Erro ao atualizar o pedido do garçom para mesa: " + erro.message,
          });
        }
      } else {
        resposta.status(400).json({
          status: false,
          mensagem:
            "Por favor, informe todos os dados do pedido do garçom para mesa conforme a documentação da API!",
        });
      }
    } else {
      resposta.status(400).json({
        status: false,
        mensagem:
          "Por favor, utilize os métodos PUT ou PATCH para atualizar um pedido do garçom para mesa!",
      });
    }
  }

  async consultarPorId(requisicao, resposta) {
    resposta.type("application/json");
    const idPedido = requisicao.params.idPedido;
  
    if (requisicao.method === "GET") {
      if (idPedido) {
        try {
          const pedidoGarcomMesaDAO = new PedidoGarcomMesaDAO();
          const pedidoGarcomMesa = await pedidoGarcomMesaDAO.consultarPorId(idPedido);
          if (pedidoGarcomMesa) {
            resposta.status(200).json({
              status: true,
              pedidoGarcomMesa: pedidoGarcomMesa,
            });
          } else {
            resposta.status(404).json({
              status: false,
              mensagem: "Pedido do garçom para mesa não encontrado.",
            });
          }
        } catch (erro) {
          resposta.status(500).json({
            status: false,
            mensagem: "Erro ao buscar pedido do garçom para mesa: " + erro.message,
          });
        }
      } else {
        resposta.status(400).json({
          status: false,
          mensagem: "Por favor, informe o ID do pedido do garçom para mesa.",
        });
      }
    } else {
      resposta.status(400).json({
        status: false,
        mensagem: "Por favor, utilize o método GET para consultar um pedido do garçom para mesa por ID.",
      });
    }
  }
}
