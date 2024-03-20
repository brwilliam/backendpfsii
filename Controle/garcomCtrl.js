import Garcom from "../Modelo/garcom.js";
import conectar from "../Persistencia/conexao.js";

export default class GarcomCtrl {
  async gravar(requisicao, resposta) {
    resposta.type("application/json");
    if (requisicao.method === "POST" && requisicao.is("application/json")) {
      const dados = requisicao.body;
      const nome = dados.nome;
      const telefone = dados.telefone;

      if (nome && telefone) {
        const garcom = new Garcom(0,nome, telefone);

        try {
          const conexao = await conectar();
          await garcom.gravar(conexao); // Passando a conexão para o método gravar
          resposta.status(200).json({
            status: true,
            mensagem: "Garçom incluído com sucesso!",
          });
        } catch (erro) {
          resposta.status(500).json({
            status: false,
            mensagem: "Erro ao registrar o garçom: " + erro.message,
          });
        }
      } else {
        resposta.status(400).json({
          status: false,
          mensagem:
            "Por favor, forneça o nome e o telefone do garçom conforme a documentação da API!",
        });
      }
    } else {
      resposta.status(400).json({
        status: false,
        mensagem: "Por favor, utilize o método POST para cadastrar um garçom!",
      });
    }
  }

  async atualizar(requisicao, resposta) {
    resposta.type("application/json");
    if (
      requisicao.method === "PUT" &&
      requisicao.is("application/json")
    ) {
      const dados = requisicao.body;
      const GarcomId = dados.GarcomId;
      const nome = dados.nome;
      const telefone = dados.telefone; // Verificar se o telefone foi informado

      if (GarcomId && nome && telefone) {
        const garcom = new Garcom();
        garcom.GarcomId = GarcomId;
        garcom.nome = nome;
        garcom.telefone = telefone;

        try {
          const conexao = await conectar();
          await garcom.atualizar(conexao); // Passando a conexão para o método atualizar
          resposta.status(200).json({
            status: true,
            mensagem: "Garçom atualizado com sucesso!",
          });
        } catch (erro) {
          resposta.status(500).json({
            status: false,
            mensagem: "Erro ao atualizar o garçom: " + erro.message,
          });
        } 
      } else {
        resposta.status(400).json({
          status: false,
          mensagem:
            "Por favor, forneça o ID, o nome e o telefone do garçom conforme a documentação da API!",
        });
      }
    } else {
      resposta.status(400).json({
        status: false,
        mensagem: "Por favor, utilize o método PUT para atualizar um garçom!",
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
      const GarcomId = dados.GarcomId;

      if (GarcomId) {
        const garcom = new Garcom();
        garcom.GarcomId = GarcomId;

        try {
          const conexao = await conectar();
          await garcom.excluir(conexao); // Passando a conexão para o método excluir
          resposta.status(200).json({
            status: true,
            mensagem: "Garçom excluído com sucesso!",
          });
        } catch (erro) {
          resposta.status(500).json({
            status: false,
            mensagem: "Erro ao excluir o garçom: " + erro.message,
          });
        }
      } else {
        resposta.status(400).json({
          status: false,
          mensagem: "Por favor, informe o ID do garçom!",
        });
      }
    } else {
      resposta.status(400).json({
        status: false,
        mensagem: "Por favor, utilize o método DELETE para excluir um garçom!",
      });
    }
  }

  async consultar(requisicao, resposta) {
    resposta.type("application/json");
    let termo = requisicao.params.termo;
    if (!termo) {
      termo = null;
    }
    if (requisicao.method === "GET") {
      const garcom = new Garcom();
      try {
        const listaGarcom = await garcom.consultar(termo);
        resposta.json({
          status: true,
          listaGarcom,
        });
      } catch (erro) {
        resposta.json({
          status: false,
          mensagem: "Não foi possível obter os garçom: " + erro.message,
        });
      }
    } else {
      resposta.status(400).json({
        status: false,
        mensagem: "Por favor, utilize o método GET para consultar garçom!",
      });
    }
  }
  async consultarPorId(requisicao, resposta) {
    resposta.type("application/json");
    const idGarcom = requisicao.params.id;

    if (requisicao.method === "GET") {
      if (idGarcom) {
        const garcom = new Garcom();
        try {
          const garcomEncontrado = await garcom.consultarPorId(idGarcom);
          if (garcomEncontrado) {
            resposta.status(200).json({
              status: true,
              garcom: garcomEncontrado,
            });
          } else {
            resposta.status(404).json({
              status: false,
              mensagem: "Garçom não encontrado.",
            });
          }
        } catch (erro) {
          resposta.status(500).json({
            status: false,
            mensagem: "Erro ao buscar garçom: " + erro.message,
          });
        }
      } else {
        resposta.status(400).json({
          status: false,
          mensagem: "Por favor, informe o ID do garçom.",
        });
      }
    } else {
      resposta.status(400).json({
        status: false,
        mensagem: "Por favor, utilize o método GET para consultar um garçom por ID.",
      });
    }
  }
  
}
