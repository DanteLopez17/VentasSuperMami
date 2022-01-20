const express = require('express');
const {
  obtenerTablaUsuarios,
  registrarUsuario,
  obtenerUsuario,
  editarUsuario,
} = require('../controladores/usuario-controlador');

const routerMethod = express.Router();

routerMethod.get('/tabla', obtenerTablaUsuarios);
routerMethod.get('/:legajo', async (req, res) => {
  try {
    const usuario = await obtenerUsuario(req.params.legajo);
    return res.status(200).json({ usuario });
  } catch (error) {
    return res.status(404).json({ msg: 'user not found' });
  }
});

// TODO verificar como mandar patch por formulario front
routerMethod.post('/editar', editarUsuario);
routerMethod.post('/registrar', registrarUsuario);

module.exports = routerMethod;
