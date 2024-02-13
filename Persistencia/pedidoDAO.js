import Pedido from "../Modelo/pedido.js";
import Restaurante from "../Modelo/Restaurante.js";
import conectar from "./conexao.js";

export default class PedidoDAO {
  async gravar(pedido) {
    if (!(pedido instanceof Pedido)) {
      throw new Error('O objeto fornecido não é uma instância de Pedido.');
    }

    const sql = `INSERT INTO Pedido (DataPedido, ValorTotal, IDRestaurante) VALUES (?, ?, ?)`;
    const parametros = [
      pedido.DataPedido,
      pedido.ValorTotal,
      pedido.restaurante.IDRestaurante,
    ];

    try {
      const conexao = await conectar();
      const resultado = await conexao.execute(sql, parametros);
      pedido.IDPedido = resultado[0].insertId;
      global.poolConexoes.releaseConnection(conexao);
    } catch (error) {
      throw new Error(`Erro ao gravar pedido no banco de dados: ${error.message}`);
    }
  }

  async atualizar(pedido) {
    if (!(pedido instanceof Pedido)) {
      throw new Error('O objeto fornecido não é uma instância de Pedido.');
    }

    const sql = `UPDATE Pedido SET DataPedido = ?, ValorTotal = ?, IDRestaurante = ? WHERE IDPedido = ?`;
    const parametros = [
      pedido.DataPedido,
      pedido.ValorTotal,
      pedido.restaurante.IDRestaurante,
      pedido.IDPedido,
    ];

    try {
      const conexao = await conectar();
      await conexao.execute(sql, parametros);
      global.poolConexoes.releaseConnection(conexao);
    } catch (error) {
      throw new Error(`Erro ao atualizar pedido no banco de dados: ${error.message}`);
    }
  }

  async excluir(pedido) {
    if (!(pedido instanceof Pedido)) {
      throw new Error('O objeto fornecido não é uma instância de Pedido.');
    }

    const sql = `DELETE FROM Pedido WHERE IDPedido = ?`;
    const parametros = [pedido.IDPedido];

    try {
      const conexao = await conectar();
      await conexao.execute(sql, parametros);
      global.poolConexoes.releaseConnection(conexao);
    } catch (error) {
      throw new Error(`Erro ao excluir pedido no banco de dados: ${error.message}`);
    }
  }

  async consultar(termo) {
    termo = termo || '';

    const conexao = await conectar();
    let listaPedidos = [];

    try {
      const sql = isNaN(parseInt(termo))
        ? `SELECT p.IDPedido, DATE_FORMAT(p.DataPedido, '%Y-%m-%d') AS DataPedido, p.ValorTotal, r.IDRestaurante, r.NomeRestaurante
          FROM Pedido p
          INNER JOIN Restaurante r ON p.IDRestaurante = r.IDRestaurante 
          WHERE p.DataPedido LIKE ?
          ORDER BY p.DataPedido`
        : `SELECT p.IDPedido, DATE_FORMAT(p.DataPedido, '%Y-%m-%d') AS DataPedido, p.ValorTotal, r.IDRestaurante, r.NomeRestaurante
          FROM Pedido p 
          INNER JOIN Restaurante r ON p.IDRestaurante = r.IDRestaurante 
          WHERE p.IDPedido = ?
          ORDER BY p.DataPedido`;
      const parametros = isNaN(parseInt(termo)) ? [`%${termo}%`] : [termo];

      const [registros] = await conexao.execute(sql, parametros);
      for (const registro of registros) {
        const restaurante = new Restaurante(registro.IDRestaurante, registro.NomeRestaurante);
        const pedido = new Pedido(registro.IDPedido, registro.DataPedido, registro.ValorTotal, restaurante);
        listaPedidos.push(pedido);
      }
    } catch (error) {
      throw new Error(`Erro ao consultar pedidos no banco de dados: ${error.message}`);
    } finally {
      global.poolConexoes.releaseConnection(conexao);
    }

    return listaPedidos;
  }
}
