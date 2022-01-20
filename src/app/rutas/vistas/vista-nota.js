const express = require('express');
const {
  renderListadoNota,
  renderAltaNota,
  renderMostarCabecera,
  renderConfirmar,
} = require('../../renders/notas');

// renders

const routherMethod = express.Router();

// renders
routherMethod.get('/listado', renderListadoNota);

routherMethod.get('/alta', renderAltaNota);

routherMethod.get('/editar/:idNota', renderMostarCabecera);
routherMethod.get('/confirmar/:idNota/:idEstado', renderConfirmar);

module.exports = routherMethod;
