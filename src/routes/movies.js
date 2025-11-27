const express = require('express');
const router = express.Router();
const controller = require('../controllers/moviesController');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '..', '..', 'public', 'img', 'uploads'));
  },
  filename: function (req, file, cb) {
    const unique = Date.now() + '-' + Math.round(Math.random()*1e9);
    cb(null, unique + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

router.get('/', controller.index);
router.get('/movie/:id', controller.show);

// admin
router.get('/admin', (req, res) => {
  if (!req.session.user) return res.redirect('/login');
  res.render('movies/admin', { user: req.session.user });
});
router.get('/movie/new', controller.newForm);
router.post('/movie/create', upload.single('cover_file'), controller.create);

module.exports = router;
