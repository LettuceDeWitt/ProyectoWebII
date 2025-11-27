CREATE DATABASE IF NOT EXISTS cine;
USE cine;

CREATE TABLE IF NOT EXISTS movies (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  year INT NOT NULL,
  director VARCHAR(200) NOT NULL,
  description TEXT,
  cover_url VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(200) NOT NULL
);

-- ejemplo: contraseña 'admin123' hashed con bcrypt (generada fuera de este script)
INSERT INTO users (username, password) VALUES ('admin', '$2b$10$abcdefghijklmnopqrstuv1234567890ABCDEFGHIJKLMN');
