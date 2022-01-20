const express = require('express');
const {
  obtenerComboDni,
  obtenerComboProveedor,
  obtenerComboLocalidad,
  obtenerComboNombreCliente,
  consultarNombreProducto,
} = require('../controladores/combo-controlador');

const routerMethod = express.Router();

routerMethod.get('/combo', obtenerComboProveedor);
routerMethod.get('/comboDni', obtenerComboDni);
routerMethod.get('/comboLocalidad', obtenerComboLocalidad);
routerMethod.get('/comboNombreC/:idCliente', obtenerComboNombreCliente);
routerMethod.post('/capturaNombreProd', consultarNombreProducto);

module.exports = routerMethod;
