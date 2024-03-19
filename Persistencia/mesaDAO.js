import Mesa from "../Modelo/mesa.js";
import conectar from "./conexao.js";

export default class MesaDAO {
  async gravar(mesa) {
    if (!(mesa instanceof Mesa)) {
      throw new Error('O objeto fornecido não é uma instância de Mesa.');
    } else {
      const sql = `INSERT INTO Mesa (Capacidade) VALUES (?)`;
      const valores = [mesa.capacidade];
      try {
        const conexao = await conectar();
        const resultado = await conexao.execute(sql, valores);
        mesa.mesaID = resultado[0].insertId;
        global.poolConexoes.releaseConnection(conexao);
      } catch (error) {
        throw new Error(`Erro ao gravar mesa no banco de dados: ${error.message}`);
      }
    }  
  }

  async atualizar(mesa) {
    if (!(mesa instanceof Mesa)) {
      throw new Error('O objeto fornecido não é uma instância de Mesa.');
    } else {
      const sql = `UPDATE Mesa SET Capacidade = ? WHERE MesaID = ?`;
      const valores = [mesa.Capacidade, mesa.MesaId];
      try {
        const conexao = await conectar();
        await conexao.execute(sql, valores);
        global.poolConexoes.releaseConnection(conexao);
      } catch (error) {
        throw new Error(`Erro ao atualizar mesa no banco de dados: ${error.message}`);
      }
    }
  }

  async excluir(mesaID) {
    const sql = `DELETE FROM Mesa WHERE MesaID = ?`;
    const parametros = [mesaID];

    try {
      const conexao = await conectar();
      await conexao.execute(sql, parametros);
      global.poolConexoes.releaseConnection(conexao);
    } catch (error) {
      throw new Error(`Erro ao excluir mesa no banco de dados: ${error.message}`);
    }
  }

  async consultar(termo) {
    termo = termo || '';

    const sql = `SELECT * FROM Mesa WHERE Capacidade LIKE ?`;
    const metodos = [`%${termo}%`];

    try {
      const conexao = await conectar();
      const [registros] = await conexao.execute(sql, metodos);
      global.poolConexoes.releaseConnection(conexao);
      return registros;
    } catch (error) {
      throw new Error(`Erro ao consultar mesas no banco de dados: ${error.message}`);
    } 
  }
}
