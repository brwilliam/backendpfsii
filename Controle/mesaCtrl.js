import Mesa from "../Modelo/mesa.js";
import MesaDAO from "../Persistencia/mesaDAO.js";

export default class MesaCtrl {
  async gravar(requisicao, resposta) {
    resposta.type("application/json");
    if (requisicao.method === "POST" && requisicao.is("application/json")) {
      const dados = requisicao.body;
      const mesa = new Mesa(dados.mesaId, dados.capacidade);
      const mesaDAO = new MesaDAO();
      await mesaDAO.gravar(mesa);
      resposta.status(201).json({
        status: true,
        mensagem: "Mesa gravada com sucesso!",
      });
    } else {
      resposta.status(400).json({
        status: false,
        mensagem:
          "Por favor, utilize o método POST para gravar mesas no sistema!",
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
      const mesa = new Mesa(dados.mesaId, dados.capacidade);
      const mesaDAO = new MesaDAO();
      await mesaDAO.atualizar(mesa);
      resposta.status(200).json({
        status: true,
        mensagem: "Mesa atualizada com sucesso!",
      });
    } else {
      resposta.status(400).json({
        status: false,
        mensagem:
          "Por favor, utilize o método PUT ou PATCH para atualizar mesas no sistema!",
      });
    } 
  }
   async excluir(requisicao, resposta) {
    resposta.type("application/json");
    if (
      requisicao.method === "DELETE" &&
      requisicao.is("application/json")
    ) {
      const dados = requisicao.body;
      const mesaId = dados.MesaId;
      if (mesaId) {
        try {
          const mesaDAO = new MesaDAO();
          await mesaDAO.excluir(mesaId);
          resposta.status(200).json({
            status: true,
            mensagem: "Mesa excluída com sucesso!",
          });
        } catch (erro) {
          resposta.status(500).json({
            status: false,
            mensagem: "Erro ao excluir a mesa: " + erro.message,
          });
        }
      } else {
        resposta.status(400).json({
          status: false,
          mensagem:
            "Por favor, forneça os dados da mesa conforme a documentação da API!",
        });
      } } else {
        resposta.status(400).json({
          status: false,
          mensagem: "Por favor, utilize o método DELETE para excluir uma mesa!",
        });
      }
    }
    async consultar (requisicao, resposta) {
      resposta.type("application/json");
      if (requisicao.method === "GET") {
        try {
          const mesaDAO = new MesaDAO();
          const mesas = await mesaDAO.consultar();
          resposta.status(200).json({
            status: true,
            mesas: mesas,
          });
        } catch (erro) {
          resposta.status(500).json({
            status: false,
            mensagem: "Erro ao buscar mesas: " + erro.message,
          });
        }
      } else {
        resposta.status(400).json({
          status: false,
          mensagem: "Por favor, utilize o método GET para consultar mesas!",
        }); 
      }
    }

    async consultarPorId(requisicao, resposta) {
      resposta.type("application/json");
      const mesaId = requisicao.params.mesaId;
      if (requisicao.method === "GET") {
        if (mesaId) {
          try {
            const mesaDAO = new Mesa();
            const mesaEncontrada = await mesaDAO.consultarPorId(mesaId);
            if (mesaEncontrada) {
              resposta.status(200).json({
                status: true,
                mesa: mesaEncontrada,
              });
            } else {
              resposta.status(404).json({
                status: false,
                mensagem: "Mesa não encontrada.",
              });
            }
          } catch (erro) { 
            resposta.status(500).json({
              status: false,
              mensagem: "Erro ao buscar mesa: " + erro.message,
            });
          } } else {
          resposta.status(400).json({
            status: false,
            mensagem: "Por favor, informe o ID da mesa.",
          });   
        } } else {
        resposta.status(400).json({
          status: false,
          mensagem: "Por favor, utilize o método GET para consultar uma mesa!",
        });
      }  
    }
}
