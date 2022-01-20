const express = require('express');
const {
  obtenerTablaClientes,
  editarCliente,
  registrarCliente,
} = require('../controladores/cliente-controlador');

const routerMethod = express.Router();

routerMethod.get('/tabla', obtenerTablaClientes);
routerMethod.post('/registrar', registrarCliente);
routerMethod.post('/editar', editarCliente);

module.exports = routerMethod;
