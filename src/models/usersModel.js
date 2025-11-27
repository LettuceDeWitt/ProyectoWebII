const pool = require('./db');
module.exports = {
  findByUsername: (username) => pool.query("SELECT * FROM users WHERE username = ?", [username]),
  create: (username, hashedPassword) => pool.query("INSERT INTO users (username, password) VALUES (?, ?)", [username, hashedPassword])
};
