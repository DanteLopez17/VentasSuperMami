const express = require('express');

const {
  renderAltaProducto,
  renderListadoProductos,
  renderObtenerProducto,
  renderConfirmarProducto,
} = require('../../renders/productos');

const routherMethod = express.Router();

// renders
routherMethod.get('/listado', renderListadoProductos);
routherMethod.get('/editar/:codigo', renderObtenerProducto);
routherMethod.get('/alta', renderAltaProducto);

routherMethod.get('/editar/:codigo', renderObtenerProducto);
routherMethod.get('/confirmar/:idProd/:idEstado', renderConfirmarProducto);

module.exports = routherMethod;
