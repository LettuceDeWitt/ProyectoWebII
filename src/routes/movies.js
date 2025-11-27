const express = require('express');
const router = express.Router();

console.log('🎯 movies.js - Iniciando carga del archivo de rutas');

// Intentar cargar el controlador
try {
  const controller = require('../controllers/moviesController');
  console.log('✅ Controlador moviesController cargado correctamente');
  
  // ✅ ORDEN CORREGIDO - rutas específicas PRIMERO
  router.get('/movie/new', controller.createForm);
  console.log('✅ Ruta GET /movie/new registrada');
  
  router.get('/admin', controller.admin);
  console.log('✅ Ruta GET /admin registrada');
  
  // ✅ Rutas con parámetros DESPUÉS
  router.get('/movie/:id', controller.show);
  console.log('✅ Ruta GET /movie/:id registrada');
  
  // Rutas públicas
  router.get('/', controller.index);
  console.log('✅ Ruta GET / registrada');
  
  // Rutas POST
  router.post('/movie/new', controller.create);
  console.log('✅ Ruta POST /movie/new registrada');
  
  router.post('/movie/:id/delete', controller.delete);
  console.log('✅ Ruta POST /movie/:id/delete registrada');
  
  console.log('🎬 Todas las rutas de movies registradas correctamente');
  
} catch (error) {
  console.error('❌ ERROR cargando moviesController:', error.message);
}

module.exports = router;