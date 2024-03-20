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
    Capacidade INT NOT NULL
);

CREATE TABLE GarcomMesa (
    GarcomId INT,
    MesaId INT,
    FOREIGN KEY (GarcomId) REFERENCES Garcom(GarcomId),
    FOREIGN KEY (MesaId) REFERENCES Mesa(MesaId),
    PRIMARY KEY (GarcomId, MesaId)
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
    FOREIGN KEY (GarcomId, MesaId) REFERENCES GarcomMesa(GarcomId, MesaId)
);



