const express = require('express');
const {
  registrarProducto,
  obtenerTablaProductos,
  modificarProducto,
  obtenerProducto,
} = require('../controladores/producto-controlador');

const routerMethod = express.Router();
routerMethod.get('/tabla', obtenerTablaProductos);
routerMethod.get('/editar', obtenerProducto);
routerMethod.post('/registrar', registrarProducto);
routerMethod.post('/editar', modificarProducto);

module.exports = routerMethod;
