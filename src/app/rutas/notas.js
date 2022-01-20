const express = require('express');
const {
  registrarProductoDetalle,
  eliminarProductoDetalle,
  consultaNombreCliente,
  obtenerTablaNota,
  obtenerTablaPedidos,
  modificarProductoDetalle,
  editarProductoDetalle,
  generarPDF,
} = require('../controladores/nota-controlador');

const routerMethod = express.Router();
routerMethod.get('/tabla/:fecha1/:fecha2/:estado', obtenerTablaNota);
routerMethod.get('/eliminar/:idDetalle', eliminarProductoDetalle);
routerMethod.get('/tablaDetalle/:idNota', obtenerTablaPedidos);
routerMethod.get('/editarProductoDetalle/:idDetalle', modificarProductoDetalle);
routerMethod.get('/generarPDF/:id', generarPDF);
routerMethod.post('/modificarProductoDetalle', editarProductoDetalle);
routerMethod.post('/captura', consultaNombreCliente);
routerMethod.post('/registrar', registrarProductoDetalle);

module.exports = routerMethod;
