const bcrypt = require('bcrypt');
const assert = require('assert');
const createError = require('http-errors');
const { formatearFecha } = require('./formato-fecha');
const logger = require('../utils/logger');

const hashPassword = (password, saltRounds = 10) => {
  try {
    const hashedPassword = bcrypt.hashSync(password, saltRounds);
    return hashedPassword;
  } catch (error) {
    logger.error(`error al hashear password ${error.message}`);
    throw error;
  }
};

const formatearCliente = () => {
  try {
    const dataFormatted = {
      activo: true,
      dadoBajaPor: null,
      FechaAlta: formatearFecha(new Date()),
      FechaBaja: null,
    };
    return dataFormatted;
  } catch (error) {
    logger.error(`error al formatear cliente ${error.message}`);
    throw error;
  }
};

const formatearUsuario = ({ password, idRol = 2 }) => {
  try {
    assert(password, createError.BadRequest('no se agregó la contraseña'));
    const dataFormatted = {
      password: hashPassword(password),
      idRol,
      activo: true,
      dadoBajaPor: null,
      FechaAlta: formatearFecha(new Date()),
      FechaBaja: null,
    };
    return dataFormatted;
  } catch (error) {
    logger.error(`error al formatear usuario ${error.message}`);
    throw error.message;
  }
};

const formatearPersona = ({
  nombre,
  apellido,
  numDocumento,
  direccion = null,
  email = null,
  FechaNacimiento,
  telefono = null,
  idTipoDocumento = 1,
  idLocalidad,
}) => {
  try {
    const dataFormatted = {
      nombre,
      apellido,
      numDocumento,
      direccion,
      email,
      FechaNacimiento: formatearFecha(new Date(FechaNacimiento)),
      telefono,
      idTipoDocumento,
      idLocalidad,
    };
    return dataFormatted;
  } catch (error) {
    logger.error(`error al formatear persona ${error.message}`);
    throw error;
  }
};

module.exports = {
  formatearUsuario,
  formatearPersona,
  formatearCliente,
  hashPassword,
};
