import MesaDAO from "../Persistencia/mesaDAO.js";
import conectar from "../Persistencia/conexao.js";

export default class MesaCtrl {
  async gravar(requisicao, resposta) {
    resposta.type("application/json");
    if (requisicao.method === "POST" && requisicao.is("application/json")) {
      const dados = requisicao.body;
      const numero = dados.numero;
      const capacidade = dados.capacidade;
      const garcom = dados.garcom;

      if (numero && capacidade > 0 && garcom) {
        try {
          const mesaDAO = new MesaDAO();
          await mesaDAO.gravar({
            numero: numero,
            capacidade: capacidade,
            garcom: garcom
          });
          resposta.status(200).json({
            status: true,
            mensagem: "Mesa incluída com sucesso!",
          });
        } catch (erro) {
          resposta.status(500).json({
            status: false,
            mensagem: "Erro ao registrar a mesa: " + erro.message,
          });
        }
      } else {
        resposta.status(400).json({
          status: false,
          mensagem:
            "Por favor, forneça os dados da mesa conforme a documentação da API!",
        });
      }
    } else {
      resposta.status(400).json({
        status: false,
        mensagem: "Por favor, utilize o método POST para cadastrar uma mesa!",
      });
    }
  }
}
