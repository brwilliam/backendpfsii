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


SELECT 
    Pedido.IDPedido,
    Pedido.IDRestaurante,
    Garcom.Nome AS NomeGarcom,
    Mesa.Numero AS NumeroMesa,
    GarcomMesa.DataAtendimento
FROM 
    PedidoGarcomMesa
JOIN 
    Pedido ON PedidoGarcomMesa.IDPedido = Pedido.IDPedido
JOIN 
    GarcomMesa ON PedidoGarcomMesa.GarcomID = GarcomMesa.GarcomID AND PedidoGarcomMesa.MesaID = GarcomMesa.MesaID
JOIN 
    Garcom ON GarcomMesa.GarcomID = Garcom.GarcomID
JOIN 
    Mesa ON GarcomMesa.MesaID = Mesa.MesaID;
