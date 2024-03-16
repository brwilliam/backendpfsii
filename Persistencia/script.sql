-- Criação da tabela Restaurante
CREATE TABLE Restaurante (
    IDRestaurante INT AUTO_INCREMENT PRIMARY KEY,
    NomeRestaurante VARCHAR(100) NOT NULL
);

-- Criação da tabela Pedido
CREATE TABLE Pedido (
    IDPedido INT AUTO_INCREMENT PRIMARY KEY,
    DataPedido DATE NOT NULL,
    ValorTotal DECIMAL(15, 2) NOT NULL,
    IDRestaurante INT NOT NULL,
    FOREIGN KEY (IDRestaurante) REFERENCES Restaurante(IDRestaurante)
);

-- Criação das tabelas relações muitos para muitos

CREATE TABLE Garcom (
  GarcomID INT AUTO_INCREMENT PRIMARY KEY,
  Nome VARCHAR(255) NOT NULL,
  Telefone VARCHAR(15) NOT NULL
);

CREATE TABLE Mesa (
  MesaID INT AUTO_INCREMENT PRIMARY KEY,
  Numero INT NOT NULL,
  Capacidade INT NOT NULL
);

-- Criar a tabela de relacionamento Garcom_Mesa

CREATE TABLE GarcomMesa (
  GarcomID INT,
  MesaID INT,
  DataAtendimento DATE,
  PRIMARY KEY (GarcomID, MesaID),
  FOREIGN KEY (GarcomID) REFERENCES Garcom(GarcomID),
  FOREIGN KEY (MesaID) REFERENCES Mesa(MesaID)
);

-- Criação da tabela de relacionamento Pedido_GarcomMesa
CREATE TABLE Pedido_GarcomMesa (
    IDPedido INT,
    GarcomID INT,
    MesaID INT,
    PRIMARY KEY (IDPedido),
    FOREIGN KEY (IDPedido) REFERENCES Pedido(IDPedido),
    FOREIGN KEY (GarcomID, MesaID) REFERENCES GarcomMesa(GarcomID, MesaID)
);

--SCRIPT DE CONSULTA COM IDpedido/Restaurante/numMesa/NomeGarcom/data/valor

SELECT p.IDPedido, r.NomeRestaurante, m.Numero AS NumeroMesa, g.Nome AS NomeGarcom, gm.DataAtendimento AS DataAtendimento, p.ValorTotal FROM Pedido p JOIN Restaurante r ON p.IDRestaurante = r.IDRestaurante JOIN PedidoGarcomMesa pgm ON p.IDPedido = pgm.IDPedido JOIN GarcomMesa gm ON pgm.GarcomID = gm.GarcomID AND pgm.MesaID = gm.MesaID JOIN Garcom g ON gm.GarcomID = g.GarcomID JOIN Mesa m ON gm.MesaID = m.MesaID;