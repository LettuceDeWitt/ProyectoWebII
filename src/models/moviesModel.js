const pool = require('./db');
module.exports = {
  getAll: () => pool.query("SELECT * FROM movies ORDER BY id DESC"),
  getById: (id) => pool.query("SELECT * FROM movies WHERE id = ?", [id]),
  create: (data) => pool.query(
    "INSERT INTO movies (title, year, director, description, cover_url) VALUES (?, ?, ?, ?, ?)",
    [data.title, data.year, data.director, data.description, data.cover_url]
  )
};
