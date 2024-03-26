import conectar from "./conexao.js";

export default class PedidoDAO {
    async gravar(pedido) {
        if (!pedido || pedido.DataPedido === undefined || pedido.IdRestaurante === undefined) {
            throw new Error("DataPedido e/ou IdRestaurante não estão definidos.");
        }

        const sql = `INSERT INTO Pedido ( DataPedido, IdRestaurante) VALUES (?, ?)`;
        const parametros = [ pedido.DataPedido, pedido.IdRestaurante];

        try {
            const conexao = await conectar();
            await conexao.execute(sql, parametros);
            global.poolConexoes.releaseConnection(conexao);
        } catch (error) {
            throw new Error(`Erro ao adicionar pedido no banco de dados: ${error.message}`);
        }
    }

    async excluir(pedido) {
        const sql = `DELETE FROM Pedido WHERE PedidoId = ?`;
        const parametros = [pedido.PedidoId];

        try {
            const conexao = await conectar();
            await conexao.execute(sql, parametros);
            global.poolConexoes.releaseConnection(conexao);
        } catch (error) {
            throw new Error(`Erro ao remover pedido do banco de dados: ${error.message}`);
        }
    }

    async consultar() {
        const sql = 'SELECT * FROM Pedido';

        try {
            const conexao = await conectar();
            const [resultados] = await conexao.execute(sql);
            global.poolConexoes.releaseConnection(conexao);
            return resultados;
        } catch (error) {
            throw new Error('Erro ao listar pedidos.');
        }
    }

    async consultarPedidosDoRestaurante(IdRestaurante) {
        const sql = `SELECT * FROM Pedido WHERE IdRestaurante = ?`;
        const parametros = [IdRestaurante];

        try {
            const conexao = await conectar();
            const [resultados] = await conexao.execute(sql, parametros);
            global.poolConexoes.releaseConnection(conexao);
            return resultados;
        } catch (error) {
            throw new Error(`Erro ao consultar pedidos do restaurante no banco de dados: ${error.message}`);
        }
    }
}
