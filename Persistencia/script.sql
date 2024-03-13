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

CREATE TABLE Cliente (
  ID_Cliente INT PRIMARY KEY AUTO_INCREMENT,
  Nome VARCHAR(255) NOT NULL,
  Telefone VARCHAR(20) NULL,  -- Telefone now enforces not null values
  Endereco VARCHAR(255) NOT NULL
);


CREATE TABLE Prato (
  ID_Prato INT PRIMARY KEY AUTO_INCREMENT,
  Nome VARCHAR(255) NOT NULL,
  Preco DECIMAL(10,2) NOT NULL
);


CREATE TABLE Cliente_Prato (
  ID_ClientePrato INT PRIMARY KEY AUTO_INCREMENT,
  ID_Cliente INT NOT NULL,
  ID_Prato INT NOT NULL,
  Quantidade INT NOT NULL DEFAULT 1,
  FOREIGN KEY (ID_Cliente) REFERENCES Cliente (ID_Cliente),
  FOREIGN KEY (ID_Prato) REFERENCES Prato (ID_Prato)  
);
