const User = require('../models/usersModel');

module.exports = {
  loginForm: (req, res) => {
    res.render('users/login', { error: null, user: null });
  },

  login: async (req, res) => {
    try {
      const { username, password } = req.body;
      
      const [rows] = await User.findByUsername(username);
      
      if (rows.length === 0) {
        return res.render('users/login', { error: 'Credenciales inválidas', user: null });
      }
      
      const user = rows[0];
      
      // Comparación directa sin hash
      if (password !== user.password) {
        return res.render('users/login', { error: 'Credenciales inválidas', user: null });
      }
      
      req.session.user = { id: user.id, username: user.username };
      res.redirect('/admin');
      
    } catch (err) {
      console.error('Error en login:', err);
      res.status(500).send('Error en login');
    }
  },

  logout: (req, res) => {
    req.session.destroy(() => res.redirect('/'));
  },

  // ✅ OPCIONAL: Método para crear más usuarios si lo necesitas
  createUser: async (req, res) => {
    try {
      const { username, password } = req.body;
      
      await User.create(username, password);
      res.redirect('/admin'); // o donde quieras redirigir
      
    } catch (err) {
      console.error('Error creando usuario:', err);
      res.status(500).send('Error creando usuario');
    }
  }
};