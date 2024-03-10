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

-- Criar a tabela Clientes
CREATE TABLE Clientes (
    ClienteID INT AUTO_INCREMENT PRIMARY KEY,
    Nome VARCHAR(100) NOT NULL,
    Email VARCHAR(100) UNIQUE NOT NULL
);

-- Criar a tabela Pratos
CREATE TABLE Pratos (
    PratoID INT AUTO_INCREMENT PRIMARY KEY,
    Nome VARCHAR(100) NOT NULL,
    Preco DECIMAL(10, 2) NOT NULL
);

-- Criar a tabela de associação Clientes_Pratos
CREATE TABLE Cliente_Prato (
    ClienteID INT,
    PratoID INT,
    PRIMARY KEY (ClienteID, PratoID),
    FOREIGN KEY (ClienteID) REFERENCES Clientes(ClienteID),
    FOREIGN KEY (PratoID) REFERENCES Pratos(PratoID)
);
