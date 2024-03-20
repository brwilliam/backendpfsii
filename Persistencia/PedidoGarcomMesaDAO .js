import conectar from "./conexao.js";

export default class PedidoGarcomMesaDAO {
  async gravar(dadosPedidoGarcomMesa) {
    const sql = `INSERT INTO PedidoGarcomMesa (PedidoID, GarcomId, MesaId, DataAtendimento) VALUES (?, ?, ?, ?)`;
    const parametros = [
      dadosPedidoGarcomMesa.PedidoID,
      dadosPedidoGarcomMesa.GarcomId,
      dadosPedidoGarcomMesa.MesaId,
      dadosPedidoGarcomMesa.dataAtendimento
    ];

    try {
      const conexao = await conectar();
      const resultado = await conexao.execute(sql, parametros);
      global.poolConexoes.releaseConnection(conexao);
      return resultado;
    } catch (error) {
      throw new Error(`Erro ao gravar pedido-garçom-mesa no banco de dados: ${error.message}`);
    }
  }

  async excluir(idPedido) {
    const sql = `DELETE FROM PedidoGarcomMesa WHERE PedidoID = ?`;
    const parametros = [idPedido];

    try {
      const conexao = await conectar();
      await conexao.execute(sql, parametros);
      global.poolConexoes.releaseConnection(conexao);
    } catch (error) {
      throw new Error(`Erro ao excluir pedido-garçom-mesa no banco de dados: ${error.message}`);
    }
  }

  async atualizar(idPedido, novosDados) {
    const sql = `UPDATE PedidoGarcomMesa SET GarcomId = ?, MesaId = ?, DataAtendimento = ? WHERE PedidoID = ?`;
    const parametros = [
      novosDados.idGarcom,
      novosDados.idMesa,
      novosDados.dataAtendimento,
      idPedido
    ];

    try {
      const conexao = await conectar();
      await conexao.execute(sql, parametros);
      global.poolConexoes.releaseConnection(conexao);
    } catch (error) {
      throw new Error(`Erro ao atualizar pedido-garçom-mesa no banco de dados: ${error.message}`);
    }
  }

  async consultar(termo) {
    let sql = "SELECT * FROM PedidoGarcomMesa";
    let parametros = [];

    if (termo) {
      sql += " WHERE idPedido = ?";
      parametros = [termo];
    }

    try {
      const conexao = await conectar();
      const [registros] = await conexao.execute(sql, parametros);
      global.poolConexoes.releaseConnection(conexao);
      return registros;
    } catch (error) {
      throw new Error(`Erro ao consultar pedido-garçom-mesa no banco de dados: ${error.message}`);
    }
  }
}
