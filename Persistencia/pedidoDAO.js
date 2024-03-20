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
            pedido.RestauranteID.RestauranteID,
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
            const sql = `SELECT 
            pedido.PedidoID, 
            DATE_FORMAT(pedido.DataPedido, '%Y-%m-%d') AS DataPedidoFormatada, 
            pedido.ValorTotal, 
            restaurante.RestauranteID, 
            restaurante.NomeRestaurante, 
            garcomMesa.GarcomId, 
            garcomMesa.MesaId
        FROM 
            Pedido pedido
        INNER JOIN 
            Restaurante restaurante ON pedido.RestauranteID = restaurante.RestauranteID
        INNER JOIN 
            GarcomMesa garcomMesa ON pedido.GarcomId = garcomMesa.GarcomId AND pedido.MesaId = garcomMesa.MesaId
        WHERE 
            pedido.DataPedido LIKE ? OR pedido.PedidoID = ?
        ORDER BY 
            pedido.DataPedido;`;
    
            const parametros = [`%${termo}%`, termo];
    
            const [registros] = await conexao.execute(sql, parametros);
    
            const listaPedidos = registros.map(registro => {
                const restaurante = { RestauranteID: registro.RestauranteID, NomeRestaurante: registro.NomeRestaurante };
                const garcomMesa = { GarcomId: registro.GarcomId, MesaId: registro.MesaId };
                return {
                    PedidoID: registro.PedidoID,
                    DataPedido: registro.DataPedidoFormatada,
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
