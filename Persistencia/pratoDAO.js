import Prato from "../Modelo/prato.js";
import ClientePrato from "../Modelo/clientePrato.js";
import conectar from "./conexao.js";

export default class PratoDAO {
    async gravar(prato) {
      if (!(prato instanceof Prato)) {
        throw new Error('O objeto fornecido não é uma instância de Prato.');
      }
  
      const conexao = await conectar();
      await conexao.beginTransaction();
  
      try {
        const sql = `INSERT INTO Prato (Nome_Prato, Preco_Prato) VALUES (?, ?)`;
        const parametros = [prato.nome, prato.preco];
        const [resultado] = await conexao.execute(sql, parametros);
        prato.pratoID = resultado.insertId;
  
        const sql2 = `INSERT INTO clientePrato (prato_pratoID, cliente_idCliente) VALUES (?, ?)`;
        for (const cliente of prato.clientes) {
          const parametros2 = [prato.pratoID, cliente.clienteID];
          await conexao.execute(sql2, parametros2);
        }
  
        await conexao.commit();
        global.poolConexoes.releaseConnection(conexao);
      } catch (error) {
        await conexao.rollback();
        throw new Error(`Erro ao gravar prato no banco de dados: ${error.message}`);
      }
    }
  

  async atualizar(prato) {
    if (!(prato instanceof Prato)) {
      throw new Error('O objeto fornecido não é uma instância de Prato.');
    }

    const sql = `UPDATE Pratos SET Nome = ?, Preco = ? WHERE PratoID = ?`;
    const parametros = [prato.nome, prato.preco, prato.pratoID];

    try {
      const conexao = await conectar();
      await conexao.execute(sql, parametros);
      global.poolConexoes.releaseConnection(conexao);
    } catch (error) {
      throw new Error(`Erro ao atualizar prato no banco de dados: ${error.message}`);
    }
  }

  async excluir(prato) {
    if (!(prato instanceof Prato)) {
      throw new Error('O objeto fornecido não é uma instância de Prato.');
    }

    const sql = `DELETE FROM Pratos WHERE PratoID = ?`;
    const parametros = [prato.pratoID];

    try {
      const conexao = await conectar();
      await conexao.execute(sql, parametros);
      global.poolConexoes.releaseConnection(conexao);
    } catch (error) {
      throw new Error(`Erro ao excluir prato no banco de dados: ${error.message}`);
    }
  }

  async consultar(termo) {
    const conexao = await conectar();

    try {
        const sql = `
            SELECT 
                c.Nome AS NomeCliente,
                p.Nome AS NomePrato
            FROM
                Clientes c
                INNER JOIN Cliente_Prato cp ON c.ClienteID = cp.ClienteID
                INNER JOIN Pratos p ON cp.PratoID = p.PratoID
            WHERE
                c.Nome LIKE ?
                OR p.Nome LIKE ?
            ORDER BY p.Nome
        `;

        const parametros = [`%${termo}%`, `%${termo}%`];

        const [registros] = await conexao.execute(sql, parametros);

        return registros.map(registro => ({ NomeCliente: registro.NomeCliente, NomePrato: registro.NomePrato }));
    } catch (error) {
        throw new Error(`Erro ao consultar clientes e pratos no banco de dados: ${error.message}`);
    } finally {
        global.poolConexoes.releaseConnection(conexao);
    }
}


}
