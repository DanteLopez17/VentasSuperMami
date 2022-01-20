const { Router } = require('express');
const vistaUsuario = require('./vistas/vista-usuario');
const vistaCliente = require('./vistas/vista-cliente');
const vistaProducto = require('./vistas/vista-producto');
const vistaPedido = require('./vistas/vista-nota');
const vistaReporte = require('./vistas/vista-reporte');

const { middEsAdministrador } = require('../middlewares/auth-middleware');

const routerMethod = Router();

routerMethod.use('/usuario', middEsAdministrador, vistaUsuario);
routerMethod.use('/cliente', vistaCliente);
routerMethod.use('/producto', vistaProducto);
routerMethod.use('/nota', vistaPedido);
routerMethod.use('/reporte', middEsAdministrador, vistaReporte);
routerMethod.use('/contacto', vistaUsuario);

module.exports = routerMethod;
