import Restaurante from "../Modelo/Restaurante.js";
import conectar from "./conexao.js";

export default class RestauranteDAO {
  async gravar(restaurante) {
    if (restaurante instanceof Restaurante) {
      const sql =
        "INSERT INTO Restaurante (NomeRestaurante) VALUES (?)";
      const parametros = [
        restaurante.NomeRestaurante,
      ];
      const conexao = await conectar();
      const retorno = await conexao.execute(sql, parametros);
      restaurante.IDRestaurante = retorno[0].insertId;
      global.poolConexoes.releaseConnection(conexao);
    }
  }

  async atualizar(restaurante) {
    if (restaurante instanceof Restaurante) {
      const sql =
        "UPDATE Restaurante SET NomeRestaurante = ? WHERE IDRestaurante = ?";
      const parametros = [
        restaurante.NomeRestaurante,
        restaurante.IDRestaurante,
      ];
      const conexao = await conectar();
      await conexao.execute(sql, parametros);
      global.poolConexoes.releaseConnection(conexao);
    }
  }

  async excluir(restaurante) {
    if (restaurante instanceof Restaurante) {
      const sql = "DELETE FROM Restaurante WHERE IDRestaurante = ?";
      const parametros = [restaurante.IDRestaurante];
      const conexao = await conectar();
      await conexao.execute(sql, parametros);
      global.poolConexoes.releaseConnection(conexao);
    }
  }

  async consultar(parametroConsulta) {
    let sql = "";
    let parametros = [];

    if (!isNaN(parseInt(parametroConsulta))) {
      // Consultar pelo código do restaurante
      sql =
        "SELECT * FROM Restaurante WHERE IDRestaurante = ? ORDER BY NomeRestaurante";
      parametros = [parametroConsulta];
    } else {
      // Consultar pelo nome do restaurante
      if (!parametroConsulta) {
        parametroConsulta = "";
      }
      sql = "SELECT * FROM Restaurante WHERE NomeRestaurante LIKE ?";
      parametros = ["%" + parametroConsulta + "%"];
    }

    const conexao = await conectar();
    const [registros] = await conexao.execute(sql, parametros);
    const listaRestaurantes = [];

    for (const registro of registros) {
      const restaurante = new Restaurante(
        registro.IDRestaurante,
        registro.NomeRestaurante
      );
      listaRestaurantes.push(restaurante);
    }

    return listaRestaurantes;
  }
}
