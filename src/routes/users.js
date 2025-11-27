const express = require('express');
const router = express.Router();
const controller = require('../controllers/usersController');

// Rutas de autenticación
router.get('/login', controller.loginForm);
router.post('/login', controller.login);
router.get('/logout', controller.logout);

// Rutas de registro y gestión
router.get('/register', controller.registerForm);
router.post('/register', controller.register);
router.get('/admin/users', controller.listUsers);

// ✅ NUEVAS RUTAS PARA EDITAR Y ELIMINAR
router.get('/admin/users/:id/edit', controller.editForm);
router.post('/admin/users/:id/update', controller.update);
router.post('/admin/users/:id/delete', controller.deleteUser);

module.exports = router;