const express = require('express');
const { obetenerTablaReporte } = require('../controladores/reporte-controlador');

const routerMethod = express.Router();

routerMethod.get(
  '/tabla/:idtipo/:idSumariza/:idDesde/:idHasta/:Estado',
  obetenerTablaReporte,
);

module.exports = routerMethod;
