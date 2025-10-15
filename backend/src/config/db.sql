CREATE DATABASE IF NOT EXISTS projeto_voluntariados CHARACTER SET utf8mb4 COLLATE
utf8mb4_unicode_ci;

USE projeto_voluntariados;

CREATE TABLE IF NOT EXISTS users (
 id INT AUTO_INCREMENT PRIMARY KEY,
 email VARCHAR(255) NOT NULL UNIQUE,
 password VARCHAR(255) NOT NULL,
 role VARCHAR(50) NOT NULL DEFAULT 'user',
 created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO users (email, password, role) VALUES
('usuario@ifrs.edu.br',
'$2b$10$382cEJJYi5YxSBNvWmufHeoPHX3dqIB9NP2R2XWzt/w.DnC0gmCr2', 'user'),
('admin@ifrs.edu.br',
'$2b$10$/JLXJ62EBlk1bNq0xmpvMuTLDJb6AWmZUs74lgEJb4Z.J9.3kFJM.', 'admin');

CREATE TABLE IF NOT EXISTS events (
 id INT AUTO_INCREMENT PRIMARY KEY,
 nome VARCHAR(255) NOT NULL,
 data date NOT NULL
);

CREATE TABLE IF NOT EXISTS events (
 id INT AUTO_INCREMENT PRIMARY KEY,
 nome VARCHAR(255) NOT NULL,
 data DATE NOT NULL
);

INSERT INTO events (id, nome, data) VALUES
(NULL, 'Maratona de Programação Intercampi', '2025-11-08'),
(NULL, 'Festival de Food Trucks Universitário', '2025-10-25'),
(NULL, 'Feira de Troca de Livros e Sebo', '2025-12-03'),
(NULL, 'Palestra: Sustentabilidade e Futuro Profissional', '2025-11-20'),
(NULL, 'Campeonato de Xadrez Relâmpago', '2026-01-15'),
(NULL, 'Noite de Talentos Musicais - Palco Aberto', '2025-10-31');

CREATE TABLE IF NOT EXISTS events (
 id INT AUTO_INCREMENT PRIMARY KEY,
 nome VARCHAR(255) NOT NULL,
 data DATE NOT NULL
);

INSERT INTO events (id, nome, data) VALUES
(NULL, 'Maratona de Programação IFRS', '2025-11-08'),
(NULL, 'Festival de Arte e Cultura', '2025-10-25'),
(NULL, 'Feira de Troca de Livros', '2025-12-03'),
(NULL, 'Palestra: Futuro da IA', '2025-11-20'),
(NULL, 'Campeonato de Xadrez IFRS', '2026-01-15'),
(NULL, 'Noite de Talentos Musicais - Palco Aberto', '2025-10-31');

CREATE TABLE IF NOT EXISTS subsevents (
 id INT AUTO_INCREMENT PRIMARY KEY,
 idEvent INT NOT NULL,
 idUser INT NOT NULL
);