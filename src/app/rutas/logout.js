const express = require('express');
const { logoutUsuario } = require('../controladores/auth-controlador');

const routerMethod = express.Router();

routerMethod.get('/', logoutUsuario);

module.exports = routerMethod;
