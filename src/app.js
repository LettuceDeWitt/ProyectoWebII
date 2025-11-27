require('dotenv').config();
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');

const moviesRoutes = require('./routes/movies');
const usersRoutes = require('./routes/users');

const app = express();
const PORT = process.env.PORT || 3000;

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

app.use('/', moviesRoutes);
app.use('/', usersRoutes);

app.use((req, res) => res.status(404).send('404 - Not found'));

app.listen(PORT, () => console.log('Server running on http://localhost:' + PORT));
