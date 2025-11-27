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
      
      req.session.user = { 
        id: user.id, 
        username: user.username,
        email: user.email 
      };
      res.redirect('/admin');
      
    } catch (err) {
      console.error('Error en login:', err);
      res.status(500).send('Error en login');
    }
  },

  logout: (req, res) => {
    req.session.destroy(() => res.redirect('/'));
  },

  // Mostrar formulario de registro
  registerForm: (req, res) => {
    res.render('users/register', { 
      error: null, 
      user: req.session.user
    });
  },

  // Procesar registro
  register: async (req, res) => {
    try {
      const { username, password, email } = req.body;
      
      // Verificar si el usuario o email ya existen
      const [existingUser] = await User.findByUsername(username);
      const [existingEmail] = await User.findByEmail(email);
      
      if (existingUser.length > 0) {
        return res.render('users/register', { 
          error: 'El usuario ya existe',
          user: req.session.user 
        });
      }
      
      if (existingEmail.length > 0) {
        return res.render('users/register', { 
          error: 'El email ya está registrado',
          user: req.session.user 
        });
      }
      
      await User.create(username, password, email);
      res.redirect('/login');
      
    } catch (err) {
      console.error('Error registrando usuario:', err);
      res.render('users/register', { 
        error: 'Error al registrar usuario',
        user: req.session.user 
      });
    }
  },

  // Listar todos los usuarios (para admin)
  listUsers: async (req, res) => {
    try {
      if (!req.session.user) return res.redirect('/login');
      
      const [users] = await User.getAll();
      res.render('users/list', { 
        users: users,
        user: req.session.user 
      });
    } catch (err) {
      console.error('Error listando usuarios:', err);
      res.status(500).send('Error al cargar usuarios');
    }
  },

  // MOSTRAR FORMULARIO DE EDICIÓN
  editForm: async (req, res) => {
    try {
      if (!req.session.user) return res.redirect('/login');
      
      const [rows] = await User.getById(req.params.id);
      const userToEdit = rows[0];
      
      if (!userToEdit) {
        return res.status(404).send('Usuario no encontrado');
      }
      
      res.render('users/edit', { 
        userToEdit: userToEdit,
        user: req.session.user,
        error: null
      });
      
    } catch (err) {
      console.error('Error cargando edición:', err);
      res.status(500).send('Error al cargar formulario de edición');
    }
  },

  // PROCESAR EDICIÓN
  update: async (req, res) => {
    try {
      if (!req.session.user) return res.redirect('/login');
      
      const { id } = req.params;
      const { username, email } = req.body;
      
      // Verificar si el usuario existe
      const [existingUser] = await User.getById(id);
      if (existingUser.length === 0) {
        return res.status(404).send('Usuario no encontrado');
      }
      
      await User.update(id, username, email);
      res.redirect('/admin/users');
      
    } catch (err) {
      console.error('Error actualizando usuario:', err);
      
      // Recargar el formulario con error
      const [rows] = await User.getById(req.params.id);
      const userToEdit = rows[0];
      
      res.render('users/edit', { 
        userToEdit: userToEdit,
        user: req.session.user,
        error: 'Error al actualizar usuario'
      });
    }
  },

  // ELIMINAR USUARIO
  deleteUser: async (req, res) => {
    try {
      console.log('Intentando eliminar usuario...');
      console.log('ID recibido:', req.params.id);
      console.log('Usuario en sesión:', req.session.user);
      
      if (!req.session.user) {
        console.log('No hay sesión, redirigiendo a login');
        return res.redirect('/login');
      }
      
      const { id } = req.params;
      
      // Evitar que el admin se elimine a sí mismo
      if (parseInt(id) === req.session.user.id) {
        console.log('Intento de auto-eliminación bloqueado');
        const [users] = await User.getAll();
        return res.render('users/list', { 
          users: users,
          user: req.session.user,
          error: 'No puedes eliminar tu propio usuario'
        });
      }
      
      console.log('Eliminando usuario ID:', id);
      await User.delete(id);
      console.log('Usuario eliminado correctamente');
      
      res.redirect('/admin/users');
      
    } catch (err) {
      console.error('Error eliminando usuario:', err);
      console.error('Stack:', err.stack);
      res.redirect('/admin/users');
    }
  }
};