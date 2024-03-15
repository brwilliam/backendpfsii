import Mesa from "../Modelo/mesa.js";
import conectar from "./conexao.js";

export default class MesaDAO {
  async gravar(mesa) {
    if (!(mesa instanceof Mesa)) {
      throw new Error('O objeto fornecido não é uma instância de Mesa.');
    }

    const sql = `INSERT INTO Mesa (Numero, Capacidade) VALUES (?, ?)`;
    const parametros = [
      mesa.numero,
      mesa.capacidade
    ];

    try {
      const conexao = await conectar();
      const resultado = await conexao.execute(sql, parametros);
      mesa.mesaID = resultado[0].insertId;
      global.poolConexoes.releaseConnection(conexao);
    } catch (error) {
      throw new Error(`Erro ao gravar mesa no banco de dados: ${error.message}`);
    }
  }

  async atualizar(mesa) {
    if (!(mesa instanceof Mesa)) {
      throw new Error('O objeto fornecido não é uma instância de Mesa.');
    }

    const sql = `UPDATE Mesa SET Numero = ?, Capacidade = ? WHERE MesaID = ?`;
    const parametros = [
      mesa.numero,
      mesa.capacidade,
      mesa.mesaID
    ];

    try {
      const conexao = await conectar();
      await conexao.execute(sql, parametros);
      global.poolConexoes.releaseConnection(conexao);
    } catch (error) {
      throw new Error(`Erro ao atualizar mesa no banco de dados: ${error.message}`);
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

    const conexao = await conectar();

    try {
      const sql = `SELECT * FROM Mesa WHERE Numero LIKE ? OR Capacidade LIKE ?`;
      const parametros = [`%${termo}%`, `%${termo}%`];

      const [registros] = await conexao.execute(sql, parametros);

      const listaMesas = registros.map(registro => {
        return new Mesa(registro.MesaID, registro.Numero, registro.Capacidade);
      });

      return listaMesas;
    } catch (error) {
      throw new Error(`Erro ao consultar mesas no banco de dados: ${error.message}`);
    } finally {
      global.poolConexoes.releaseConnection(conexao);
    }
  }
}
