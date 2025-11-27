const pool = require('./db');

module.exports = {
  findByUsername: (username) => pool.query("SELECT * FROM users WHERE username = ?", [username]),
  findByEmail: (email) => pool.query("SELECT * FROM users WHERE email = ?", [email]),
  create: (username, hashedPassword, email) => 
    pool.query("INSERT INTO users (username, password, email) VALUES (?, ?, ?)", 
    [username, hashedPassword, email]),
  getAll: () => pool.query("SELECT id, username, email FROM users ORDER BY id DESC"),
  
  // MÉTODOS PARA EDITAR Y ELIMINAR
  update: (id, username, email) => 
    pool.query("UPDATE users SET username = ?, email = ? WHERE id = ?", 
    [username, email, id]),
  
  delete: (id) => pool.query("DELETE FROM users WHERE id = ?", [id]),
  
  getById: (id) => pool.query("SELECT * FROM users WHERE id = ?", [id])
};