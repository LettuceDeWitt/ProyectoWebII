const User = require('../models/usersModel');
const bcrypt = require('bcrypt');

module.exports = {
  loginForm: (req, res) => {
    res.render('users/login', { error: null, user: null });
  },

  login: async (req, res) => {
    try {
      const { username, password } = req.body;
      const [rows] = await User.findByUsername(username);
      if (rows.length === 0) return res.render('users/login', { error: 'Credenciales inválidas', user: null });
      const user = rows[0];
      const match = await bcrypt.compare(password, user.password);
      if (!match) return res.render('users/login', { error: 'Credenciales inválidas', user: null });
      req.session.user = { id: user.id, username: user.username };
      res.redirect('/admin');
    } catch (err) {
      console.error(err);
      res.status(500).send('Error en login');
    }
  },

  logout: (req, res) => {
    req.session.destroy(() => res.redirect('/'));
  }
};
