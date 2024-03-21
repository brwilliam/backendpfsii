import conectar from "./conexao.js";

export default class PedidoGarcomMesaDAO {
    async gravar(relacao) {
        if (!relacao || relacao.PedidoId === undefined || relacao.GarcomId === undefined || relacao.MesaId === undefined) {
            throw new Error("PedidoId, GarcomId e/ou MesaId não estão definidos.");
        }

        const sql = `INSERT INTO PedidoGarcomMesa (PedidoId, GarcomId, MesaId) VALUES (?, ?, ?)`;
        const parametros = [relacao.PedidoId, relacao.GarcomId, relacao.MesaId];

        try {
            const conexao = await conectar();
            await conexao.execute(sql, parametros);
            global.poolConexoes.releaseConnection(conexao);
        } catch (error) {
            throw new Error(`Erro ao adicionar relação pedido-garçom-mesa no banco de dados: ${error.message}`);
        }
    }

    async excluir(relacao) {
        const sql = `DELETE FROM PedidoGarcomMesa WHERE PedidoId = ? AND GarcomId = ? AND MesaId = ?`;
        const parametros = [relacao.PedidoId, relacao.GarcomId, relacao.MesaId];

        try {
            const conexao = await conectar();
            await conexao.execute(sql, parametros);
            global.poolConexoes.releaseConnection(conexao);
        } catch (error) {
            throw new Error(`Erro ao remover relação pedido-garçom-mesa do banco de dados: ${error.message}`);
        }
    }

    async listarRelacoes() {
        const sql = 'SELECT * FROM PedidoGarcomMesa';

        try {
            const conexao = await conectar();
            const [resultados] = await conexao.execute(sql);
            global.poolConexoes.releaseConnection(conexao);
            return resultados;
        } catch (error) {
          throw new Error('Erro ao listar todas as relações pedido-garçom-mesa.');
        }
    }

    // Método adicional para consultar todas as relações para um pedido específico
    async consultarPorPedido(PedidoId) {
        const sql = `SELECT * FROM PedidoGarcomMesa WHERE PedidoId = ?`;
        const parametros = [PedidoId];

        try {
            const conexao = await conectar();
            const [resultados] = await conexao.execute(sql, parametros);
            global.poolConexoes.releaseConnection(conexao);
            return resultados;
        } catch (error) {
            throw new Error(`Erro ao consultar relações para o pedido no banco de dados: ${error.message}`);
        }
    }

    // Método adicional para consultar todas as relações para um garçom específico
    async consultarPorGarcom(GarcomId) {
        const sql = `SELECT * FROM PedidoGarcomMesa WHERE GarcomId = ?`;
        const parametros = [GarcomId];

        try {
            const conexao = await conectar();
            const [resultados] = await conexao.execute(sql, parametros);
            global.poolConexoes.releaseConnection(conexao);
            return resultados;
        } catch (error) {
            throw new Error(`Erro ao consultar relações para o garçom no banco de dados: ${error.message}`);
        }
    }

    // Método adicional para consultar todas as relações para uma mesa específica
    async consultarPorMesa(MesaId) {
        const sql = `SELECT * FROM PedidoGarcomMesa WHERE MesaId = ?`;
        const parametros = [MesaId];

        try {
            const conexao = await conectar();
            const [resultados] = await conexao.execute(sql, parametros);
            global.poolConexoes.releaseConnection(conexao);
            return resultados;
        } catch (error) {
            throw new Error(`Erro ao consultar relações para a mesa no banco de dados: ${error.message}`);
        }
    }
}
