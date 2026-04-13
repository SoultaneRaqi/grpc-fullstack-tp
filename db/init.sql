CREATE DATABASE IF NOT EXISTS testdb;
USE testdb;

CREATE TABLE IF NOT EXISTS produits (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(255) NOT NULL,
    prix FLOAT NOT NULL
);

INSERT INTO produits (nom, prix) VALUES ('Laptop', 1200.50);
INSERT INTO produits (nom, prix) VALUES ('Mouse', 25.99);