const { Router } = require('express');
const usuario = require('./usuarios');
const login = require('./login');
const cliente = require('./clientes');
const producto = require('./productos');
const combos = require('./combos');
const notaPedido = require('./notas');
const report = require('./reporte');

const logout = require('./logout');
const vistas = require('./vistas');
const {
  checkAuthenticated,
  checkNotAuthenticated,
} = require('../middlewares/auth-middleware');
const { middEsAdministrador } = require('../middlewares/auth-middleware');

const routerMethod = Router();

routerMethod.get('/', (req, res) => {
  if (req.isAuthenticated()) {
    return res.redirect('/vistas/producto/listado');
  }
  return res.redirect('/login');
});

routerMethod.use('/login', checkNotAuthenticated, login);

routerMethod.use((req, res, next) => checkAuthenticated(req, res, next));
routerMethod.use('/logout', logout);
routerMethod.use('/usuario', middEsAdministrador, usuario);
routerMethod.use('/vistas', vistas);
routerMethod.use('/cliente', cliente);
routerMethod.use('/producto', producto);
routerMethod.use('/combos', combos);
routerMethod.use('/nota', notaPedido);
routerMethod.use('/reporte', middEsAdministrador, report);

module.exports = routerMethod;
