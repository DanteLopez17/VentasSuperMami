const express = require('express');

const {
  renderAltaCliente,
  renderListadoClientes,
  renderEditarCliente,
  renderConfirmarCliente,
} = require('../../renders/clientes');

const routherMethod = express.Router();
routherMethod.get('/listado', renderListadoClientes);
routherMethod.get('/alta', renderAltaCliente);
routherMethod.get('/editar/:idCliente', renderEditarCliente);

routherMethod.get('/confirmar/:idCliente/:idEstado', renderConfirmarCliente);
module.exports = routherMethod;
