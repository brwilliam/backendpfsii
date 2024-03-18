import conectar from "./conexao.js";

export default class GarcomMesaDAO {
  async gravar(garcomMesa) {
    const sql = `INSERT INTO GarcomMesa (GarcomId, MesaID, DataAtendimento) VALUES (?, ?, ?)`;
    const parametros = [
      garcomMesa.GarcomId,
      garcomMesa.mesaID,
      garcomMesa.dataAtendimento,
    ];

    try {
      const conexao = await conectar();
      await conexao.execute(sql, parametros);
      global.poolConexoes.releaseConnection(conexao);
    } catch (error) {
      throw new Error(`Erro ao adicionar relação garçom-mesa no banco de dados: ${error.message}`);
    }
  }

  async excluir(garcomMesa) {
    const sql = `DELETE FROM GarcomMesa WHERE GarcomId = ? AND MesaID = ?`;
    const parametros = [garcomMesa.GarcomId, garcomMesa.mesaID];

    try {
      const conexao = await conectar();
      await conexao.execute(sql, parametros);
      global.poolConexoes.releaseConnection(conexao);
    } catch (error) {
      throw new Error(`Erro ao remover relação garçom-mesa no banco de dados: ${error.message}`);
    }
  }

  async consultarMesasDoGarcom(GarcomId) {
    const sql = `SELECT * FROM Garcom_Mesa WHERE GarcomId = ?`;
    const parametros = [GarcomId];

    try {
      const conexao = await conectar();
      const [resultados] = await conexao.execute(sql, parametros);
      global.poolConexoes.releaseConnection(conexao);
      return resultados;
    } catch (error) {
      throw new Error(`Erro ao consultar mesas do garçom no banco de dados: ${error.message}`);
    }
  }

  async consultarGarconsDaMesa(mesaID) {
    const sql = `SELECT * FROM Garcom_Mesa WHERE MesaID = ?`;
    const parametros = [mesaID];

    try {
      const conexao = await conectar();
      const [resultados] = await conexao.execute(sql, parametros);
      global.poolConexoes.releaseConnection(conexao);
      return resultados;
    } catch (error) {
      throw new Error(`Erro ao consultar garçons da mesa no banco de dados: ${error.message}`);
    }
  }
}
