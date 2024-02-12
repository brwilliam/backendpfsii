import Pedido from "../Modelo/pedido.js";
import Restaurante from "../Modelo/Restaurante.js";
import conectar from "./conexao.js";

export default class PedidoDAO {
  async gravar(pedido) {
    if (pedido instanceof Pedido) {
      const sql = `INSERT INTO Pedido (DataPedido, ValorTotal, IDRestaurante) VALUES (?, ?, ?)`;
      const parametros = [
        pedido.DataPedido,
        pedido.ValorTotal,
        pedido.restaurante.IDRestaurante,
      ];

      const conexao = await conectar();
      const [resultado] = await conexao.execute(sql, parametros);
      pedido.IDPedido = resultado.insertId;
      global.poolConexoes.releaseConnection(conexao);
    }
  }

  async atualizar(pedido) {
    if (pedido instanceof Pedido) {
      const sql = `UPDATE Pedido SET DataPedido = ?, ValorTotal = ?, IDRestaurante = ? WHERE IDPedido = ?`;
      const parametros = [
        pedido.DataPedido,
        pedido.ValorTotal,
        pedido.restaurante.IDRestaurante,
        pedido.IDPedido,
      ];

      const conexao = await conectar();
      await conexao.execute(sql, parametros);
      global.poolConexoes.releaseConnection(conexao);
    }
  }

  async excluir(pedido) {
    if (pedido instanceof Pedido) {
      const sql = `DELETE FROM Pedido WHERE IDPedido = ?`;
      const parametros = [pedido.IDPedido];

      const conexao = await conectar();
      await conexao.execute(sql, parametros);
      global.poolConexoes.releaseConnection(conexao);
    }
  }

  async consultar(termo) {
    if (!termo) {
      termo = "";
    }

    const conexao = await conectar();
    let listaPedidos = [];

    if (!isNaN(parseInt(termo))) {
      // Consulta pelo código do pedido
      const sql = `SELECT * FROM Pedido 
        INNER JOIN restaurante r ON p.IDRestaurante = r.IDRestaurante 
        WHERE p.IDPedido = ?
        ORDER BY r.DataPedido`;
      const parametros = [termo];

      const [registros] = await conexao.execute(sql, parametros);
      for (const registro of registros) {
        const restaurante = new Restaurante(registro.IDRestaurante);
        const pedido = new Pedido(
          registro.DataPedido,
          registro.ValorTotal,
          restaurante
        );
        pedido.IDPedido = registro.IDPedido;
        listaPedidos.push(pedido);
      }
    } else {
      // Consulta pela data do pedido
      const sql = `SELECT * FROM Pedido p
      INNER JOIN restaurante r ON p.IDRestaurante = r.IDRestaurante 
      WHERE p.DataPedido LIKE ?
      ORDER BY p.DataPedido`;
      
      const parametros = [`%${termo}%`];

      const [registros] = await conexao.execute(sql, parametros);
      for (const registro of registros) {
        const restaurante = new Restaurante(registro.IDRestaurante);
        const pedido = new Pedido(
          registro.DataPedido,
          registro.ValorTotal,
          restaurante
        );
        pedido.IDPedido = registro.IDPedido;
        listaPedidos.push(pedido);
      }
    }

    global.poolConexoes.releaseConnection(conexao);
    return listaPedidos;
  }
}
