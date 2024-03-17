import Pedido from "../Modelo/pedido.js";
// import Restaurante from "../Modelo/Restaurante.js";
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
      pedido.Restaurante.IDRestaurante, // Alteração aqui
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
      pedido.Restaurante.IDRestaurante, // Alteração aqui
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

    try {
        const sql = `SELECT p.IDPedido, DATE_FORMAT(p.DataPedido, '%Y-%m-%d') AS DataPedido, p.ValorTotal, r.IDRestaurante, r.NomeRestaurante, gm.GarcomID, gm.MesaID
            FROM Pedido p
            INNER JOIN Restaurante r ON p.IDRestaurante = r.IDRestaurante 
            INNER JOIN PedidoGarcomMesa pgm ON p.IDPedido = pgm.IDPedido
            INNER JOIN GarcomMesa gm ON pgm.GarcomID = gm.GarcomID AND pgm.MesaID = gm.MesaID
            WHERE p.DataPedido LIKE ? OR p.IDPedido = ?
            ORDER BY p.DataPedido`;

        const parametros = [`%${termo}%`, termo];

        const [registros] = await conexao.execute(sql, parametros);

        const listaPedidos = registros.map(registro => {
            const restaurante = { IDRestaurante: registro.IDRestaurante, NomeRestaurante: registro.NomeRestaurante };
            const garcomMesa = { GarcomID: registro.GarcomID, MesaID: registro.MesaID };
            return {
                IDPedido: registro.IDPedido,
                DataPedido: registro.DataPedido,
                ValorTotal: registro.ValorTotal,
                restaurante: restaurante,
                garcomMesa: garcomMesa
            };
        });

        return listaPedidos;
    } catch (error) {
        throw new Error(`Erro ao consultar pedidos no banco de dados: ${error.message}`);
    } finally {
        global.poolConexoes.releaseConnection(conexao);
    }
}

}
