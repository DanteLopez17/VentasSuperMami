const express = require('express');
const config = require('config');
const cors = require('cors');
const exphbs = require('express-handlebars');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const flash = require('express-flash');
const passport = require('passport');
const indexRoutes = require('./src/app/rutas/index');
const logger = require('./src/app/utils/logger');
const corsMiddleware = require('./src/app/middlewares/cors-middleware');

// Inicializaciones
require('./src/app/database/conexion');

const initializePassport = require('./src/app/passport/local-auth');

initializePassport(passport);

const app = express();

let corsOptions = {};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(flash());
app.use(cookieParser(config.get('secrets.cookie')));
app.use(
  session({
    secret: config.get('secrets.passport'),
    resave: false,
    saveUninitialized: false,
  }),
);
app.use(passport.initialize());
app.use(passport.session());

app.set('port', config.get('port'));

app.set('views', path.join(__dirname, 'src/views'));
// Publico
app.use(express.static(path.join(__dirname, 'src/public')));

app.engine(
  '.hbs',
  exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
  }),
);

app.set('view engine', 'hbs');

// Allow CORS
const allowCrossDomain = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization',
  );
  next();
};

app.use(allowCrossDomain);
app.use(
  corsMiddleware.setCors,
  (req, res, next) => {
    corsOptions = res.locals.corsOptions;
    next();
  },
  cors(corsOptions),
);

// Routes
app.use(indexRoutes);

app.listen(app.get('port'), () => {
  logger.info(`server listening on http://localhost:${app.get('port')}/`);
});
