import express from "express";
import cors from "cors";
import rotaRestaurante from "./Rotas/rotaRestaurante.js";
import rotaPedido from "./Rotas/rotaPedido.js"; // Importe a rota do pedido aqui

const host = "0.0.0.0";
const porta = "3000";

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/restaurante", rotaRestaurante); // Use a rota do restaurante
app.use("/pedido", rotaPedido); // Use a rota do pedido

app.listen(porta, host, () => {
  console.log(`Servidor escutando na porta ${host}:${porta}.`);
});
