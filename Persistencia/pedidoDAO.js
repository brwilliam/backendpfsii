import Pedido from "../Modelo/pedido.js";
import conectar from "./conexao.js";

export default class PedidoDAO {
    async gravar(pedido) {
        if (!(pedido instanceof Pedido)) {
            throw new Error('O objeto fornecido não é uma instância de Pedido.');
        }

        const sql = `INSERT INTO Pedido (DataPedido, ValorTotal, RestauranteID, GarcomId, MesaId) VALUES (?, ?, ?, ?, ?)`;
        const parametros = [
            pedido.DataPedido,
            pedido.ValorTotal,
            pedido.Restaurante.RestauranteID,
            pedido.GarcomMesa.GarcomId,
            pedido.GarcomMesa.MesaId
        ];

        try {
            const conexao = await conectar();
            const resultado = await conexao.execute(sql, parametros);
            pedido.PedidoID = resultado[0].insertId;
            global.poolConexoes.releaseConnection(conexao);
        } catch (error) {
          await conexao.rollback();
          throw error;
        }
    }

    async atualizar(pedido) {
        if (!(pedido instanceof Pedido)) {
            throw new Error('O objeto fornecido não é uma instância de Pedido.');
        }

        const sql = `UPDATE Pedido SET DataPedido = ?, ValorTotal = ?, RestauranteID = ?, GarcomId = ?, MesaId = ? WHERE PedidoID = ?`;
        const parametros = [
            pedido.DataPedido,
            pedido.ValorTotal,
            pedido.Restaurante.RestauranteID,
            pedido.GarcomMesa.GarcomId,
            pedido.GarcomMesa.MesaId,
            pedido.PedidoID
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

        const sql = `DELETE FROM Pedido WHERE PedidoID = ?`;
        const parametros = [pedido.PedidoID];

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
            const sql = `SELECT p.PedidoID, DATE_FORMAT(p.DataPedido, '%Y-%m-%d') AS DataPedido, p.ValorTotal, r.RestauranteID, r.NomeRestaurante, pgm.GarcomId, pgm.MesaId
                FROM Pedido p
                INNER JOIN Restaurante r ON p.RestauranteID = r.RestauranteID
                INNER JOIN PedidoGarcomMesa pgm ON p.PedidoID = pgm.PedidoID
                WHERE p.DataPedido LIKE ? OR p.PedidoID = ?
                ORDER BY p.DataPedido`;

            const parametros = [`%${termo}%`, termo];

            const [registros] = await conexao.execute(sql, parametros);

            const listaPedidos = registros.map(registro => {
                const restaurante = { RestauranteID: registro.RestauranteID, NomeRestaurante: registro.NomeRestaurante };
                const garcomMesa = { GarcomId: registro.GarcomId, MesaId: registro.MesaId };
                return {
                    PedidoID: registro.PedidoID,
                    DataPedido: registro.DataPedido,
                    ValorTotal: registro.ValorTotal,
                    Restaurante: restaurante,
                    GarcomMesa: garcomMesa
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
