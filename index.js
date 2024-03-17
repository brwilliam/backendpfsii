import express from "express";
import cors from "cors";
import rotaRestaurante from "./Rotas/rotaRestaurante.js";
import rotaPedido from "./Rotas/rotaPedido.js"; 
import rotaLogin from "./Rotas/rotaLogin.js";
import rotaGarcom from "./Rotas/rotaGarcom.js";
import rotaPedidoGarcomMesa from "./Rotas/rotaPedidoGarcomMesa.js"; // Importe a rota do pedido garcom mesa
import dotenv from "dotenv";
import session from "express-session";
import { verificarAcesso } from "./Seguranca/Autenticacao.js";

const host = "0.0.0.0";
const porta = "3000";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  session({
    secret: 'SEGREDO',
    // secret: process.env.SEGREDO,
    resave: false,
    saveUninitialized: true,
    maxAge: 1000 * 60 * 6,
  })
);

// verificarAcesso passa a ser o middleware = camada do meio
app.use("/login", rotaLogin);
app.use("/restaurante", verificarAcesso, rotaRestaurante); // Use a rota do restaurante
app.use("/pedido", rotaPedido); // Use a rota do pedido
app.use("/garcom",verificarAcesso, rotaGarcom);
app.use("/pedido-garcom-mesa",verificarAcesso, rotaPedidoGarcomMesa); // Adicione a rota do pedido garcom mesa

app.listen(porta, host, () => {
  console.log(`Servidor escutando na porta ${host}:${porta}.`);
});
