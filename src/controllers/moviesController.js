const Movie = require('../models/moviesModel');

module.exports = {
  index: async (req, res) => {
    try {
      const [movies] = await Movie.getAll();
      res.render('movies/index', { movies, user: req.session.user });
    } catch (err) {
      console.error(err);
      res.status(500).send('Error al obtener películas');
    }
  },

  show: async (req, res) => {
    try {
      const [rows] = await Movie.getById(req.params.id);
      const movie = rows[0];
      if (!movie) return res.status(404).send('No encontrada');
      res.render('movies/show', { movie, user: req.session.user });
    } catch (err) {
      console.error(err);
      res.status(500).send('Error en DB');
    }
  },

  newForm: (req, res) => {
    if (!req.session.user) return res.redirect('/login');
    res.render('movies/new', { user: req.session.user });
  },

  create: async (req, res) => {
    try {
      let coverPath = req.file ? '/img/uploads/' + req.file.filename : req.body.cover_url;
      await Movie.create({
        title: req.body.title,
        year: req.body.year,
        director: req.body.director,
        description: req.body.description,
        cover_url: coverPath
      });
      res.redirect('/');
    } catch (err) {
      console.error(err);
      res.status(500).send('Error al guardar película');
    }
  }
};
const Movie = require('../models/moviesModel');

module.exports = {
  // Mostrar formulario para nueva película
  createForm: (req, res) => {
    res.render('movies/new', { error: null });
  },

  // Procesar nueva película
  create: async (req, res) => {
    try {
      const { title, year, director, description, cover_url } = req.body;
      await Movie.create(title, year, director, description, cover_url);
      res.redirect('/admin');
    } catch (err) {
      console.error('Error creando película:', err);
      res.render('movies/new', { error: 'Error al crear película' });
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
