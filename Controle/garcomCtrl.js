import Garcom from "../Modelo/garcom.js";
import conectar from "./conexao.js";

export default class GarcomCtrl {
  async gravar(requisicao, resposta) {
    resposta.type("application/json");
    if (requisicao.method === "POST" && requisicao.is("application/json")) {
      const dados = requisicao.body;
      const nome = dados.nome;
      const telefone = dados.telefone;

      if (nome && telefone) {
        const garcom = new Garcom(nome, telefone);

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
      (requisicao.method === "PUT" || requisicao.method === "PATCH") &&
      requisicao.is("application/json")
    ) {
      const dados = requisicao.body;
      const idGarcom = dados.idGarcom;
      const nome = dados.nome;
      const telefone = dados.telefone;

      if (idGarcom && nome && telefone) {
        const garcom = new Garcom(nome, telefone);
        garcom.garcomID = idGarcom;

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
            "Por favor, informe todos os dados do garçom conforme a documentação da API!",
        });
      }
    } else {
      resposta.status(400).json({
        status: false,
        mensagem:
          "Por favor, utilize os métodos PUT ou PATCH para atualizar um garçom!",
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
      const idGarcom = dados.idGarcom;

      if (idGarcom) {
        const garcom = new Garcom();
        garcom.garcomID = idGarcom;

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
      termo = "";
    }
    if (requisicao.method === "GET") {
      const garcom = new Garcom();
      try {
        const listaGarcons = await garcom.consultar(termo);
        resposta.json({
          status: true,
          listaGarcons,
        });
      } catch (erro) {
        resposta.json({
          status: false,
          mensagem: "Não foi possível obter os garçons: " + erro.message,
        });
      }
    } else {
      resposta.status(400).json({
        status: false,
        mensagem: "Por favor, utilize o método GET para consultar garçons!",
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
