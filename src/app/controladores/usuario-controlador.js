const { response } = require('express');
const { StatusCodes } = require('http-status-codes');
const {
  transaccionUsuario,
  consultarUsuario,
  modificarUsuario,
} = require('../querys/usuario-querys');
const { formatearPersona, formatearUsuario } = require('../helpers/formato-entidad');
const logger = require('../utils/logger');
const { consultarTablaUsuarios } = require('../querys/usuario-querys');

/** -------------------------------------------------------------------------------
*  Registra un nuevo usuario en la base de datos, encripta la contraseña y genera un
*  token
*  @param  { object }   req el request que contiene en su body el legajo y la contraseña
*                           del usuario a registrar
*  @param  { response } res response de la peticion, por default toma el valor del
*                           response de express.
*  @return { void }
*                  On success (201) => devuelve success: true con info adicional
*                  On error (500) => loggea en consola el error encontrado y devuelve 
*                            success: false con info del error
*  @author Agustin Molas Demitropulos
*  @date   10/08/2021
------------------------------------------------------------------------------- */

const registrarUsuario = async (req, res = response) => {
  const {
    nombre,
    apellido,
    numDocumento,
    direccion,
    email,
    FechaNacimiento,
    telefono,
    idTipoDocumento,
    idLocalidad,
    legajo,
    password,
    idRol,
  } = req.body;
  const dataPersona = {
    nombre,
    apellido,
    numDocumento,
    direccion,
    email,
    FechaNacimiento,
    telefono,
    idTipoDocumento,
    idLocalidad,
  };
  const dataUsuario = { legajo, password, idRol };
  const usuarioFormateado = formatearUsuario(dataUsuario);
  try {
    const personaFormateada = formatearPersona(dataPersona);
    await transaccionUsuario(personaFormateada, usuarioFormateado);
    return res.redirect('../vistas/usuario/listado');
  } catch (error) {
    logger.debug(`usuario: ${JSON.stringify(usuarioFormateado)}`);
    logger.error(error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ success: false, msg: error });
  }
};

const obtenerUsuario = async (legajo) => {
  try {
    const usuario = await consultarUsuario(legajo);
    usuario.esAdministrador = usuario.descripcion === 'Administrador';
    return usuario;
  } catch (error) {
    logger.error(error);
    throw error;
  }
};

const obtenerTablaUsuarios = async (req, res) => {
  try {
    const usuarios = await consultarTablaUsuarios('usuarios');
    res.status(StatusCodes.OK).send(JSON.stringify(usuarios));
  } catch (error) {
    logger.error(`error al obtener tabla usuarios ${error}`);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ success: false, msg: error.message });
  }
};

const editarUsuario = async (req, res) => {
  try {
    await modificarUsuario(req.body);
    res.redirect('../vistas/usuario/listado');
  } catch (error) {
    logger.error(`Ocurrió un error al editar usuario: ${error}`);
    throw error;
  }
};

module.exports = {
  registrarUsuario,
  obtenerUsuario,
  obtenerTablaUsuarios,
  editarUsuario,
};
