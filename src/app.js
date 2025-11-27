require('dotenv').config();
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');

console.log('=== 🚀 INICIANDO APLICACIÓN ===');
console.log('📁 Directorio actual:', __dirname);

// ✅ RUTAS CORRECTAS
console.log('=== 🔧 CARGANDO RUTAS ===');
const moviesRoutes = require('./routes/movies');
const usersRoutes = require('./routes/users');

console.log('✅ moviesRoutes cargado:', typeof moviesRoutes);
console.log('✅ usersRoutes cargado:', typeof usersRoutes);

// Verifica que sean funciones de router
console.log('🎬 moviesRoutes es función router?', moviesRoutes && typeof moviesRoutes === 'function');
console.log('👤 usersRoutes es función router?', usersRoutes && typeof usersRoutes === 'function');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware de debug - agregar esto
app.use((req, res, next) => {
  console.log('🔍 Ruta solicitada:', req.method, req.url);
  next();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({
  secret: process.env.SESSION_SECRET || 'secret',
  resave: false,
  saveUninitialized: false
}));
app.use(express.static(path.join(__dirname, '..', 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// express-ejs-layouts
app.use(expressLayouts);
app.set('layout', 'layout');

// ✅ MONTAR RUTAS
console.log('=== 🌐 MONTANDO RUTAS EN APP ===');
app.use('/', moviesRoutes);
app.use('/', usersRoutes);
console.log('✅ Rutas montadas en la aplicación');

app.use((req, res) => {
  console.log('❌ Ruta no encontrada:', req.method, req.url);
  res.status(404).send('404 - Not found');
});

app.listen(PORT, () => {
  console.log('=== 🎬 SERVIDOR INICIADO ===');
  console.log(`📍 http://localhost:${PORT}`);
  console.log('=== ✅ DEBUG COMPLETADO ===');
});