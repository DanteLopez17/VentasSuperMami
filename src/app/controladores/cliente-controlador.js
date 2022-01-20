const { response } = require('express');
const { StatusCodes } = require('http-status-codes');
const {
  transaccionCliente,
  consultarTablaClientes,
  consultarCliente,
  modificarCliente,
} = require('../querys/cliente-querys');
const { formatearPersona, formatearCliente } = require('../helpers/formato-entidad');
const logger = require('../utils/logger');

const obtenerTablaClientes = async (req, res) => {
  try {
    const clientes = await consultarTablaClientes();
    res.status(StatusCodes.OK).send(JSON.stringify(clientes));
  } catch (error) {
    logger.error(`error al obtener tabla clientes ${error}`);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ success: false, msg: error.message });
  }
};

const registrarCliente = async (req, res = response) => {
  const personaFormateada = formatearPersona(req.body);
  const clienteFormateado = formatearCliente();
  try {
    await transaccionCliente(personaFormateada, clienteFormateado);
    return await res.redirect('../vistas/cliente/listado');
  } catch (error) {
    logger.debug(`cliente: ${JSON.stringify(clienteFormateado)}`);
    logger.error(error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ success: false, msg: error });
  }
};

const retornarCliente = async (req, res) => {
  const { idCliente } = req.params;
  try {
    const cliente = await consultarCliente(idCliente);
    res.status(StatusCodes.OK).send(JSON.stringify(cliente));
  } catch (error) {
    logger.error(`error al obtener el cliente ${error}`);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ success: false, msg: error.message });
  }
};

const editarCliente = async (req, res) => {
  try {
    await modificarCliente(req.body);
    res.redirect('../vistas/cliente/listado');
  } catch (error) {
    logger.error(`Ocurrió un error al editar el cliente: ${error}`);
    throw error;
  }
};

module.exports = {
  registrarCliente,
  obtenerTablaClientes,
  retornarCliente,
  editarCliente,
};
