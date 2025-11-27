const pool = require('./db');

module.exports = {
  getAll: () => pool.query("SELECT * FROM movies"),
  getById: (id) => pool.query("SELECT * FROM movies WHERE id = ?", [id]),
  create: (title, year, director, description, cover_url) => 
    pool.query("INSERT INTO movies (title, year, director, description, cover_url) VALUES (?, ?, ?, ?, ?)", 
    [title, year, director, description, cover_url]),
  delete: (id) => pool.query("DELETE FROM movies WHERE id = ?", [id])
};