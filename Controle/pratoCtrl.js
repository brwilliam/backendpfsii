import Prato from "../Modelo/prato.js"; // Certifique-se de importar a classe Prato corretamente

export default class PratoCtrl {
  async gravar(requisicao, resposta) {
    resposta.type("application/json");
    if (requisicao.method === "POST" && requisicao.is("application/json")) {
      const dados = requisicao.body;
      const nome = dados.nome;
      const preco = dados.preco;

      if (nome && preco > 0) {
        const prato = new Prato(nome, preco);

        try {
          await prato.gravar();
          resposta.status(200).json({
            status: true,
            mensagem: "Prato incluído com sucesso!",
          });
        } catch (erro) {
          resposta.status(500).json({
            status: false,
            mensagem: "Erro ao registrar o prato: " + erro.message,
          });
        }
      } else {
        resposta.status(400).json({
          status: false,
          mensagem:
            "Por favor, forneça o nome e o preço do prato conforme a documentação da API!",
        });
      }
    } else {
      resposta.status(400).json({
        status: false,
        mensagem: "Por favor, utilize o método POST para cadastrar um prato!",
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
      const idPrato = dados.idPrato;
      const nome = dados.nome;
      const preco = dados.preco;

      if (idPrato && nome && preco > 0) {
        const prato = new Prato(nome, preco);
        prato.pratoID = idPrato;

        try {
          await prato.atualizar();
          resposta.status(200).json({
            status: true,
            mensagem: "Prato atualizado com sucesso!",
          });
        } catch (erro) {
          resposta.status(500).json({
            status: false,
            mensagem: "Erro ao atualizar o prato: " + erro.message,
          });
        }
      } else {
        resposta.status(400).json({
          status: false,
          mensagem:
            "Por favor, informe todos os dados do prato conforme a documentação da API!",
        });
      }
    } else {
      resposta.status(400).json({
        status: false,
        mensagem:
          "Por favor, utilize os métodos PUT ou PATCH para atualizar um prato!",
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
      const idPrato = dados.idPrato;

      if (idPrato) {
        const prato = new Prato();
        prato.pratoID = idPrato;

        try {
          await prato.excluir();
          resposta.status(200).json({
            status: true,
            mensagem: "Prato excluído com sucesso!",
          });
        } catch (erro) {
          resposta.status(500).json({
            status: false,
            mensagem: "Erro ao excluir o prato: " + erro.message,
          });
        }
      } else {
        resposta.status(400).json({
          status: false,
          mensagem: "Por favor, informe o ID do prato!",
        });
      }
    } else {
      resposta.status(400).json({
        status: false,
        mensagem: "Por favor, utilize o método DELETE para excluir um prato!",
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
      const prato = new Prato();
      try {
        const listaPratos = await prato.consultar(termo);
        resposta.json({
          status: true,
          listaPratos,
        });
      } catch (erro) {
        resposta.json({
          status: false,
          mensagem: "Não foi possível obter os pratos: " + erro.message,
        });
      }
    } else {
      resposta.status(400).json({
        status: false,
        mensagem: "Por favor, utilize o método GET para consultar pratos!",
      });
    }
  }
}
