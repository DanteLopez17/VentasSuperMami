const express = require('express');

const {
  renderListadoUsuario,
  renderEditarUsuario,
  renderAltaUsuario,
  renderConfirmarUsu,
} = require('../../renders/usuarios');

const routerMethod = express.Router();

// renders
routerMethod.get('/listado', renderListadoUsuario);
routerMethod.get('/editar/:legajo', renderEditarUsuario);
routerMethod.get('/alta', renderAltaUsuario);
routerMethod.get('/confirmar/:idUsuario/:idEstado', renderConfirmarUsu);

module.exports = routerMethod;
