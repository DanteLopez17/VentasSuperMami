const LocalStrategy = require('passport-local').Strategy;
const { loginUsuario } = require('../controladores/auth-controlador');
const logger = require('../utils/logger');
const { obtenerUsuario } = require('../controladores/usuario-controlador');

const initialize = async (passport) => {
  const authenticateUser = async (legajo, password, done) => {
    try {
      const dataUsuario = await loginUsuario(legajo, password);
      const { errorHandler } = dataUsuario;
      if (!errorHandler.success) {
        return done(null, false, { message: errorHandler.msg });
      }
      logger.info('usuario loggeado.');
      return done(null, dataUsuario.usuario);
    } catch (error) {
      logger.error(error);
      return done(error);
    }
  };
  passport.use(
    new LocalStrategy(
      {
        usernameField: 'legajo',
      },
      authenticateUser,
    ),
  );
  passport.serializeUser((user, done) => done(null, user.legajo));
  passport.deserializeUser(async (id, done) => {
    const usuario = await obtenerUsuario(id);
    return done(null, usuario);
  });
};

module.exports = initialize;
