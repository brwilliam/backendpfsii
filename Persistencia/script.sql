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
