import Restaurante from "../Modelo/Restaurante.js";

export default class RestauranteCtrl {
  async gravar(requisicao, resposta) {
    resposta.type("application/json");
    if (requisicao.method === "POST" && requisicao.is("application/json")) {
      const dados = requisicao.body;
      const nomeRestaurante = dados.NomeRestaurante;

      if (nomeRestaurante) {
        const restaurante = new Restaurante(0, nomeRestaurante);

        try {
          await restaurante.gravar();
          resposta.status(200).json({
            status: true,
            mensagem: "Restaurante incluído com sucesso!",
          });
        } catch (erro) {
          resposta.status(500).json({
            status: false,
            mensagem: "Erro ao registrar o restaurante: " + erro.message,
          });
        }
      } else {
        resposta.status(400).json({
          status: false,
          mensagem:
            "Por favor, informe todos os dados do restaurante conforme a documentação da API!",
        });
      }
    } else {
      resposta.status(400).json({
        status: false,
        mensagem:
          "Por favor, utilize o método POST para cadastrar um restaurante!",
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
      const idRestaurante = dados.idRestaurante;
      const nomeRestaurante = dados.nomeRestaurante;

      if (idRestaurante && nomeRestaurante) {
        const restaurante = new Restaurante(idRestaurante, nomeRestaurante);

        try {
          await restaurante.atualizar();
          resposta.status(200).json({
            status: true,
            mensagem: "Restaurante atualizado com sucesso!",
          });
        } catch (erro) {
          resposta.status(500).json({
            status: false,
            mensagem: "Erro ao atualizar o restaurante: " + erro.message,
          });
        }
      } else {
        resposta.status(400).json({
          status: false,
          mensagem:
            "Por favor, informe todos os dados do restaurante conforme a documentação da API!",
        });
      }
    } else {
      resposta.status(400).json({
        status: false,
        mensagem:
          "Por favor, utilize os métodos PUT ou PATCH para atualizar um restaurante!",
      });
    }
  }

  async excluir(requisicao, resposta) {
    resposta.type("application/json");
    if (requisicao.method === "DELETE" && requisicao.is("application/json")) {
      const dados = requisicao.body;
      const idRestaurante = dados.idRestaurante;

      if (idRestaurante) {
        const restaurante = new Restaurante(idRestaurante);

        try {
          await restaurante.excluir();
          resposta.status(200).json({
            status: true,
            mensagem: "Restaurante excluído com sucesso!",
          });
        } catch (erro) {
          resposta.status(500).json({
            status: false,
            mensagem: "Erro ao excluir o restaurante: " + erro.message,
          });
        }
      } else {
        resposta.status(400).json({
          status: false,
          mensagem: "Por favor, informe o ID do restaurante!",
        });
      }
    } else {
      resposta.status(400).json({
        status: false,
        mensagem:
          "Por favor, utilize o método DELETE para excluir um restaurante!",
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
      const restaurante = new Restaurante();
      try {
        const listaRestaurantes = await restaurante.consultar(termo);
        resposta.json({
          status: true,
          listaRestaurantes,
        });
      } catch (erro) {
        resposta.json({
          status: false,
          mensagem: "Não foi possível obter os restaurantes: " + erro.message,
        });
      }
    } else {
      resposta.status(400).json({
        status: false,
        mensagem:
          "Por favor, utilize o método GET para consultar restaurantes!",
      });
    }
  }
}
