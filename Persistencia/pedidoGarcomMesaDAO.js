import conectar from "./conexao.js";

export default class PedidoGarcomMesaDAO {
  async gravar(pedidoGarcomMesa) {
    const sql = `INSERT INTO GarcomMesa (GarcomID, MesaID, DataAtendimento) VALUES (?, ?, ?)`;
    const parametros = [
      pedidoGarcomMesa.idGarcom,
      pedidoGarcomMesa.idMesa,
      pedidoGarcomMesa.dataAtendimento
    ];

    try {
      const conexao = await conectar();
      await conexao.execute(sql, parametros);
      global.poolConexoes.releaseConnection(conexao);
    } catch (error) {
      throw new Error(`Erro ao gravar pedido garçom mesa no banco de dados: ${error.message}`);
    }
  }

  async excluir(idPedido) {
    const sql = `DELETE FROM GarcomMesa WHERE IDPedido = ?`;
    const parametros = [idPedido];

    try {
      const conexao = await conectar();
      await conexao.execute(sql, parametros);
      global.poolConexoes.releaseConnection(conexao);
    } catch (error) {
      throw new Error(`Erro ao excluir pedido garçom mesa no banco de dados: ${error.message}`);
    }
  }

  async atualizar(idPedido, pedidoGarcomMesa) {
    const sql = `UPDATE GarcomMesa SET GarcomID = ?, MesaID = ?, DataAtendimento = ? WHERE IDPedido = ?`;
    const parametros = [
      pedidoGarcomMesa.idGarcom,
      pedidoGarcomMesa.idMesa,
      pedidoGarcomMesa.dataAtendimento,
      idPedido
    ];

    try {
      const conexao = await conectar();
      await conexao.execute(sql, parametros);
      global.poolConexoes.releaseConnection(conexao);
    } catch (error) {
      throw new Error(`Erro ao atualizar pedido garçom mesa no banco de dados: ${error.message}`);
    }
  }

  async consultarPorId(idPedido) {
    const sql = `SELECT * FROM GarcomMesa WHERE IDPedido = ?`;
    const parametros = [idPedido];

    try {
      const conexao = await conectar();
      const [registros] = await conexao.execute(sql, parametros);
      global.poolConexoes.releaseConnection(conexao);

      if (registros.length > 0) {
        const registro = registros[0];
        return {
          idPedido: registro.IDPedido,
          idGarcom: registro.GarcomID,
          idMesa: registro.MesaID,
          dataAtendimento: registro.DataAtendimento
        };
      } else {
        return null;
      }
    } catch (error) {
      throw new Error(`Erro ao consultar pedido garçom mesa por ID no banco de dados: ${error.message}`);
    }
  }
}
