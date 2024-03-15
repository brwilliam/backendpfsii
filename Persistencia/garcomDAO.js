import Garcom from "../Modelo/garcom.js";
import conectar from "./conexao.js";

export default class GarcomDAO {
  async gravar(garcom) {
    if (!(garcom instanceof Garcom)) {
      throw new Error('O objeto fornecido não é uma instância de Garcom.');
    }

    const sql = `INSERT INTO Garcom (Nome, Telefone) VALUES (?, ?)`;
    const parametros = [
      garcom.nome,
      garcom.telefone
    ];

    try {
      const conexao = await conectar();
      const resultado = await conexao.execute(sql, parametros);
      garcom.garcomID = resultado[0].insertId;
      global.poolConexoes.releaseConnection(conexao);
    } catch (error) {
      throw new Error(`Erro ao gravar garçom no banco de dados: ${error.message}`);
    }
  }

  async atualizar(garcom) {
    if (!(garcom instanceof Garcom)) {
      throw new Error('O objeto fornecido não é uma instância de Garcom.');
    }

    const sql = `UPDATE Garcom SET Nome = ?, Telefone = ? WHERE GarcomID = ?`;
    const parametros = [
      garcom.nome,
      garcom.telefone,
      garcom.garcomID
    ];

    try {
      const conexao = await conectar();
      await conexao.execute(sql, parametros);
      global.poolConexoes.releaseConnection(conexao);
    } catch (error) {
      throw new Error(`Erro ao atualizar garçom no banco de dados: ${error.message}`);
    }
  }

  async excluir(garcomID) {
    const sql = `DELETE FROM Garcom WHERE GarcomID = ?`;
    const parametros = [garcomID];

    try {
      const conexao = await conectar();
      await conexao.execute(sql, parametros);
      global.poolConexoes.releaseConnection(conexao);
    } catch (error) {
      throw new Error(`Erro ao excluir garçom no banco de dados: ${error.message}`);
    }
  }

  async consultar(termo) {
    termo = termo || '';

    const conexao = await conectar();

    try {
      const sql = `SELECT * FROM Garcom WHERE Nome LIKE ? OR Telefone LIKE ?`;
      const parametros = [`%${termo}%`, `%${termo}%`];

      const [registros] = await conexao.execute(sql, parametros);

      const listaGarcons = registros.map(registro => {
        return new Garcom(registro.GarcomID, registro.Nome, registro.Telefone);
      });

      return listaGarcons;
    } catch (error) {
      throw new Error(`Erro ao consultar garçons no banco de dados: ${error.message}`);
    } finally {
      global.poolConexoes.releaseConnection(conexao);
    }
  }
}
