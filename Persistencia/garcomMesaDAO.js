import conectar from "./conexao.js";

export default class GarcomMesaDAO {
  async gravar(garcomMesa) {
    if (!garcomMesa || garcomMesa.GarcomId === undefined || garcomMesa.MesaId === undefined) {
        throw new Error("GarcomId e/ou MesaId não estão definidos.");
    }

    const sql = `INSERT INTO GarcomMesa (GarcomId, MesaId) VALUES (?, ?)`;
    const parametros = [garcomMesa.GarcomId, garcomMesa.MesaId];

    try {
        const conexao = await conectar();
        await conexao.execute(sql, parametros);
        global.poolConexoes.releaseConnection(conexao);
    } catch (error) {
        throw new Error(`Erro ao adicionar relação garçom-mesa no banco de dados: ${error.message}`);
    }
}

  async excluir(garcomMesa) {
    const sql = `DELETE FROM GarcomMesa WHERE GarcomId = ? AND MesaId = ?`;
    const parametros = [garcomMesa.GarcomId, garcomMesa.MesaId];

    try {
      const conexao = await conectar();
      await conexao.execute(sql, parametros);
      global.poolConexoes.releaseConnection(conexao);
    } catch (error) {
      throw new Error(`Erro ao remover relação garçom-mesa no banco de dados: ${error.message}`);
    }
  }

  async consultarMesasDoGarcom(GarcomId) {
    const sql = `SELECT * FROM GarcomMesa WHERE GarcomId = ?`;
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

  async consultarGarconsDaMesa(MesaId) {
    const sql = `SELECT * FROM GarcomMesa WHERE MesaId = ?`;
    const parametros = [MesaId];

    try {
      const conexao = await conectar();
      const [resultados] = await conexao.execute(sql, parametros);
      global.poolConexoes.releaseConnection(conexao);
      return resultados;
    } catch (error) {
      throw new Error(`Erro ao consultar garçons da mesa no banco de dados: ${error.message}`);
    }
  }
  async listarRelacoes() {
    const query = 'SELECT * FROM GarcomMesa';

    try {
      const connection = await conectar();
      const [results] = await connection.execute(query);
      global.poolConexoes.releaseConnection(connection);
      return results;
    } catch (error) {
      throw new Error('Erro ao listar todas as associações garçom-mesa');
    }
  }

}
