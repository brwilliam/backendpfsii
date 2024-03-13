import Prato from "../Modelo/prato.js";
import ClientePrato from "../Modelo/clientePrato.js";
import conectar from "./conexao.js";

export default class PratoDAO {
  async gravar(prato) {
    if (!(prato instanceof Prato)) {
      throw new Error("O objeto fornecido não é uma instância de Prato.");
    }

    const conexao = await conectar();
    await conexao.beginTransaction();

    try {
      // Insere o prato na tabela Prato
      const sqlPrato = `INSERT INTO Prato (Nome, Preco) VALUES (?, ?)`;
      const parametrosPrato = [prato.nome, prato.preco];
      const [resultadoPrato] = await conexao.execute(sqlPrato, parametrosPrato);
      prato.pratoID = resultadoPrato.insertId;

      // Insere os clientes do prato na tabela ClientePrato
      const sqlClientePrato = `INSERT INTO ClientePrato (ID_Cliente, ID_Prato, Quantidade) VALUES (?, ?, ?)`;
      for (const clientePrato of prato.clientes) {
        const parametrosClientePrato = [
          clientePrato.clienteID,
          prato.pratoID,
          clientePrato.quantidade,
        ];
        await conexao.execute(sqlClientePrato, parametrosClientePrato);
      }

      await conexao.commit();
      global.poolConexoes.releaseConnection(conexao);
    } catch (error) {
      await conexao.rollback();
      throw new Error(
        `Erro ao gravar prato no banco de dados: ${error.message}`
      );
    }
  }

  async atualizar(prato) {
    if (!(prato instanceof Prato)) {
      throw new Error("O objeto fornecido não é uma instância de Prato.");
    }

    const sql = `UPDATE Prato SET Nome = ?, Preco = ? WHERE PratoID = ?`;
    const parametros = [prato.nome, prato.preco, prato.pratoID];

    try {
      const conexao = await conectar();
      await conexao.execute(sql, parametros);
      global.poolConexoes.releaseConnection(conexao);
    } catch (error) {
      throw new Error(
        `Erro ao atualizar prato no banco de dados: ${error.message}`
      );
    }
  }

  async excluir(prato) {
    if (!(prato instanceof Prato)) {
      throw new Error("O objeto fornecido não é uma instância de Prato.");
    }

    const sql = `DELETE FROM Prato WHERE PratoID = ?`;
    const parametros = [prato.pratoID];

    try {
      const conexao = await conectar();
      await conexao.execute(sql, parametros);
      global.poolConexoes.releaseConnection(conexao);
    } catch (error) {
      throw new Error(
        `Erro ao excluir prato no banco de dados: ${error.message}`
      );
    }
  }

  async consultar(termo) {
    const conexao = await conectar();

    try {
      const sql = `
      SELECT 
      Cliente.Nome AS NomeCliente,
      Prato.Nome AS NomePrato,
      Prato.Preco AS Preco,
      Prato.ID_Prato AS PratoID
    FROM
      Cliente
    INNER JOIN Cliente_Prato ON
    Cliente.ID_Cliente = Cliente_Prato.ID_Cliente
    INNER JOIN Prato ON Cliente_Prato.ID_Prato = Prato.ID_Prato
        WHERE
          Cliente.Nome LIKE ?
        OR
          Prato.Nome LIKE ?
        ORDER BY
          Prato.Nome
      `;

      const parametros = [`%${termo}%`, `%${termo}%`];

      const [registros] = await conexao.execute(sql, parametros);

      const pratos = registros.map((registro) => ({
        nomeCliente: registro.NomeCliente,
        nomePrato: registro.NomePrato,
        preco: registro.Preco,
        pratoID: registro.PratoID,
        clientes: [], // TODO: Implementar consulta de clientes do prato
      }));

      global.poolConexoes.releaseConnection(conexao);
      return pratos;
    } catch (error) {
      throw new Error(
        `Erro ao consultar pratos no banco de dados: ${error.message}`
      );
    }
  }
}
