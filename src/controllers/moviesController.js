const Movie = require('../models/moviesModel');

module.exports = {
  // Listar todas las películas (página principal)
  index: async (req, res) => {
    try {
      const [movies] = await Movie.getAll();
      res.render('movies/index', { movies, user: req.session.user });
    } catch (err) {
      console.error(err);
      res.status(500).send('Error al obtener películas');
    }
  },

  // Mostrar detalle de una película
  show: async (req, res) => {
    try {
      const [rows] = await Movie.getById(req.params.id);
      const movie = rows[0];
      if (!movie) return res.status(404).send('Película no encontrada');
      res.render('movies/show', { movie, user: req.session.user });
    } catch (err) {
      console.error(err);
      res.status(500).send('Error en la base de datos');
    }
  },

  // Panel de administración
  admin: async (req, res) => {
    try {
      if (!req.session.user) return res.redirect('/login');
      
      const [movies] = await Movie.getAll();
      res.render('movies/admin', { 
        user: req.session.user,
        movies: movies
      });
    } catch (err) {
      console.error('Error en admin:', err);
      res.status(500).send('Error al cargar el panel admin');
    }
  },

  // Mostrar formulario para nueva película
  createForm: (req, res) => {
    if (!req.session.user) return res.redirect('/login');
    res.render('movies/new', { user: req.session.user, error: null });
  },

  // Procesar nueva película
// Método CORREGIDO para crear película
create: async (req, res) => {
  try {
    console.log('=== INICIANDO CREACIÓN DE PELÍCULA ===');
    console.log('Datos recibidos:', req.body);
    
    const { title, year, director, description, cover_url } = req.body;
    
    // Validar que todos los campos tengan datos
    if (!title || !year || !director || !description || !cover_url) {
      console.log('Faltan campos obligatorios');
      return res.render('movies/new', { 
        error: 'Todos los campos son obligatorios', 
        user: req.session.user 
      });
    }
    
    console.log('Llamando a Movie.create...');
    const result = await Movie.create(title, year, director, description, cover_url);
    console.log('Resultado de Movie.create:', result);
    
    console.log('Redirigiendo a /admin');
    res.redirect('/admin');
    
  } catch (err) {
    console.error('ERROR en create:', err);
    res.render('movies/new', { 
      error: 'Error al crear película: ' + err.message, 
      user: req.session.user 
    });
  }
},

  // Eliminar película
  delete: async (req, res) => {
    try {
      const { id } = req.params;
      await Movie.delete(id);
      res.redirect('/admin');
    } catch (err) {
      console.error('Error eliminando película:', err);
      res.redirect('/admin');
    }
  }
};