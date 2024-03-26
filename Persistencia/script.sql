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
    PedidoId INT AUTO_INCREMENT PRIMARY KEY,
    dataPedido DATETIME NOT NULL,
    idRestaurante INT,
    valorTotal DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (idRestaurante) REFERENCES Restaurante(RestauranteID)
    FOREIGN KEY (GarcomId) REFERENCES Garcom(GarcomId) 
    FOREIGN KEY (MesaId) REFERENCES Mesa(MesaId)
);

-- -- Criação da tabela de associação PedidoGarcomMesa
-- CREATE TABLE PedidoGarcomMesa (
--     PedidoId INT,
--     GarcomId INT,
--     MesaId INT,
--     FOREIGN KEY (PedidoId) REFERENCES Pedido(PedidoId),
--     FOREIGN KEY (GarcomId) REFERENCES Garcom(GarcomId),
--     FOREIGN KEY (MesaId) REFERENCES Mesa(MesaId),
--     PRIMARY KEY (PedidoId, GarcomId, MesaId)
-- );
