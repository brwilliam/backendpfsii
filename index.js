import express from "express";
import cors from "cors";
import rotaRestaurante from "./Rotas/rotaRestaurante.js";
import rotaPedido from "./Rotas/rotaPedido.js"; 
import rotaLogin from "./Rotas/rotaLogin.js";
import rotaGarcom from "./Rotas/rotaGarcom.js";
import rotaMesa from "./Rotas/rotaMesa.js";
import dotenv from "dotenv";
import session from "express-session";
import { verificarAcesso } from "./Seguranca/Autenticacao.js";
import rotaGarcomMesa from "./Rotas/rotaGarcomMesa.js";
import rotaPedidoGarcomMesa from "./Rotas/rotaPedidoGarcomMesa.js";

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

//verificarAcesso

// verificarAcesso passa a ser o middleware = camada do meio
app.use("/login", rotaLogin);
app.use("/restaurante", rotaRestaurante); // Use a rota do restaurante
app.use("/pedido", rotaPedido); // Use a rota do pedido
app.use("/garcom", rotaGarcom);
app.use("/mesa", rotaMesa);
app.use("/garcom-mesa", rotaGarcomMesa)
app.use("/pedido-garcom-mesa", rotaPedidoGarcomMesa);

app.listen(porta, host, () => {
  console.log(`Servidor escutando na porta ${host}:${porta}.`);
});
