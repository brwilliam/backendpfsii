import express from "express";
import cors from "cors";
import rotaRestaurante from "./Rotas/rotaRestaurante.js";
import rotaPedido from "./Rotas/rotaPedido.js"; // Importe a rota do pedido aqui
import rotaLogin from "./Rotas/rotaLogin.js"
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
app.use(session({
  secret:process.env.SEGREDO,
  resave: false,
  saveUninitialized: true,
  maxAge:1000 * 60 * 6
}))
// verificarAcesso passa a ser o middleware = camada do meio 
app.use('/login',rotaLogin);
app.use("/restaurante",verificarAcesso, rotaRestaurante); // Use a rota do restaurante
app.use("/pedido",verificarAcesso, rotaPedido); // Use a rota do pedido

app.listen(porta, host, () => {
  console.log(`Servidor escutando na porta ${host}:${porta}.`);
});
