-- Criação do esquema sistema_restaurante
CREATE SCHEMA sistema_restaurante;

-- Selecionar o esquema sistema_restaurante
USE sistema_restaurante;

-- Criação da tabela Restaurante
CREATE TABLE Restaurante (
    IDRestaurante INT PRIMARY KEY,
    NomeRestaurante VARCHAR(100) NOT NULL,
    Endereco VARCHAR(255) NOT NULL,
    Telefone VARCHAR(20) NOT NULL
);

-- Criação da tabela Pedido
CREATE TABLE Pedido (
    IDPedido INT PRIMARY KEY,
    DataPedido DATE NOT NULL,
    ValorTotal DECIMAL(15, 2) NOT NULL,
    IDRestaurante INT NOT NULL,
    FOREIGN KEY (IDRestaurante) REFERENCES Restaurante(IDRestaurante)
);
