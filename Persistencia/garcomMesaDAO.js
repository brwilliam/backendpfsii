import conectar from "./conexao.js";

export default class GarcomMesaDAO {
  async adicionar(garcomMesa) {
    const sql = `INSERT INTO Garcom_Mesa (GarcomID, MesaID, DataAtendimento) VALUES (?, ?, ?)`;
    const parametros = [
      garcomMesa.garcomID,
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

  async remover(garcomMesa) {
    const sql = `DELETE FROM Garcom_Mesa WHERE GarcomID = ? AND MesaID = ?`;
    const parametros = [garcomMesa.garcomID, garcomMesa.mesaID];

    try {
      const conexao = await conectar();
      await conexao.execute(sql, parametros);
      global.poolConexoes.releaseConnection(conexao);
    } catch (error) {
      throw new Error(`Erro ao remover relação garçom-mesa no banco de dados: ${error.message}`);
    }
  }

  async consultarMesasDoGarcom(garcomID) {
    const sql = `SELECT * FROM Garcom_Mesa WHERE GarcomID = ?`;
    const parametros = [garcomID];

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
