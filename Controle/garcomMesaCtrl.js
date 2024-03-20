import GarcomMesa from "../Modelo/garcomMesa.js";

export default class GarcomMesaCtrl {
  async gravar(request, response) {
    response.type("application/json");
    if (request.method === "POST" && request.is("application/json")) {
      const { GarcomId, MesaId } = request.body;

      if (GarcomId && MesaId) {
        const garcomMesa = new GarcomMesa(GarcomId, MesaId);

        try {
          await garcomMesa.gravar();
          response.status(200).json({
            status: true,
            mensagem: "Relação garçom-mesa incluída com sucesso!",
          });
        } catch (error) {
          response.status(500).json({
            status: false,
            mensagem: "Erro ao registrar a relação garçom-mesa: " + error.message,
          });
        }
      } else {
        response.status(400).json({
          status: false,
          mensagem: "Por favor, informe o GarcomId e o MesaId!",
        });
      }
    } else {
      response.status(400).json({
        status: false,
        mensagem: "Por favor, utilize o método POST para cadastrar uma relação garçom-mesa!",
      });
    }
  }

  async excluir(request, response) {
    response.type("application/json");
    if (request.method === "DELETE" && request.is("application/json")) {
      const { GarcomId, MesaId } = request.body;

      if (GarcomId && MesaId) {
        const garcomMesa = new GarcomMesa(GarcomId, MesaId);

        try {
          await garcomMesa.excluir();
          response.status(200).json({
            status: true,
            mensagem: "Relação garçom-mesa excluída com sucesso!",
          });
        } catch (error) {
          response.status(500).json({
            status: false,
            mensagem: "Erro ao excluir a relação garçom-mesa: " + error.message,
          });
        }
      } else {
        response.status(400).json({
          status: false,
          mensagem: "Por favor, informe o GarcomId e o MesaId!",
        });
      }
    } else {
      response.status(400).json({
        status: false,
        mensagem: "Por favor, utilize o método DELETE para excluir uma relação garçom-mesa!",
      });
    }
  }

  async consultarMesasDoGarcom(request, response) {
    response.type("application/json");
    const { GarcomId } = request.params;

    if (GarcomId) {
      const garcomMesa = new GarcomMesa();
      try {
        const mesas = await garcomMesa.consultarMesasDoGarcom(GarcomId);
        response.json({
          status: true,
          mesas,
        });
      } catch (error) {
        response.json({
          status: false,
          mensagem: "Não foi possível obter as mesas do garçom: " + error.message,
        });
      }
    } else {
      response.status(400).json({
        status: false,
        mensagem: "Por favor, informe o GarcomId!",
      });
    }
  }

  async consultarGarconsDaMesa(request, response) {
    response.type("application/json");
    const { MesaId } = request.params;

    if (MesaId) {
      const garcomMesa = new GarcomMesa();
      try {
        const garcons = await garcomMesa.consultarGarconsDaMesa(MesaId);
        response.json({
          status: true,
          garcons,
        });
      } catch (error) {
        response.json({
          status: false,
          mensagem: "Não foi possível obter os garçons da mesa: " + error.message,
        });
      }
    } else {
      response.status(400).json({
        status: false,
        mensagem: "Por favor, informe o MesaId!",
      });
    }
  }
  async listarRelacoes(request, response) {
    const garcomMesa = new GarcomMesa();
    try {
      const relacoes = await garcomMesa.listarRelacoes();
      response.json({ relacoes });
    } catch (error) {
      response.status(500).json({ message: error.message });
    }
  }
}
