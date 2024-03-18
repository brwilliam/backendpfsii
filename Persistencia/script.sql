-- Criação da tabela Restaurante
CREATE TABLE Restaurante (
    RestauranteID INT AUTO_INCREMENT PRIMARY KEY,
    NomeRestaurante VARCHAR(100) NOT NULL
);

-- Criação da tabela Garcom
CREATE TABLE Garcom (
    GarcomId INT AUTO_INCREMENT PRIMARY KEY,
    Nome VARCHAR(255) NOT NULL,
    Telefone VARCHAR(15) NOT NULL
);

-- Criação da tabela Mesa
CREATE TABLE Mesa (
    MesaId INT AUTO_INCREMENT PRIMARY KEY,
    Numero INT NOT NULL,
    Capacidade INT NOT NULL
);

-- Criação da tabela Pedido
CREATE TABLE Pedido (
    PedidoID INT AUTO_INCREMENT PRIMARY KEY,
    DataPedido DATE NOT NULL,
    ValorTotal DECIMAL(15, 2) NOT NULL,
    RestauranteID INT NOT NULL,
    GarcomId INT NOT NULL,
    MesaId INT NOT NULL,
    FOREIGN KEY (RestauranteID) REFERENCES Restaurante(RestauranteID),
    FOREIGN KEY (GarcomId) REFERENCES Garcom(GarcomId),
    FOREIGN KEY (MesaId) REFERENCES Mesa(MesaId)
);

-- Criação da tabela PedidoGarcomMesa
CREATE TABLE PedidoGarcomMesa (
    PedidoID INT,
    GarcomId INT,
    MesaId INT,
    PRIMARY KEY (PedidoID, GarcomId, MesaId),
    FOREIGN KEY (PedidoID) REFERENCES Pedido(PedidoID),
    FOREIGN KEY (GarcomId) REFERENCES Garcom(GarcomId),
    FOREIGN KEY (MesaId) REFERENCES Mesa(MesaId)
);
