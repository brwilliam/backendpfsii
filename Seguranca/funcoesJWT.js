//funcoes para gerar token de acesso para acessar nossa API
//verificar assinatura token valida
import jwt from "jsonwebtoken";

//nao podemos manter senhas no codigo fonte
// info sensiveis devem ser armazenadas em variaveis de ambiente

export function assinar(usuario) {
  const token = jwt.sign({usuario},process.env.SEGREDO,{expiresIn: "300s"});
  return token;
}

export function verificarAssinatura(token) {
    return jwt.verify(token, process.env.SEGREDO);
    
}
