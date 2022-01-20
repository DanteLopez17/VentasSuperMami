const { response } = require('express');
const { StatusCodes } = require('http-status-codes');
const {
  transaccionProducto,
  consultarTablaProductos,
  consultarProducto,
  editarProducto,
} = require('../querys/producto-querys');
const logger = require('../utils/logger');

const obtenerTablaProductos = async (req, res) => {
  try {
    const productos = await consultarTablaProductos();
    res.status(StatusCodes.OK).send(JSON.stringify(productos));
  } catch (error) {
    logger.error(`error al obtener tabla productos ${error}`);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ success: false, msg: error.message });
  }
};

const registrarProducto = async (req, res = response) => {
  try {
    await transaccionProducto(req.body);
    return res.redirect('../vistas/producto/listado');
  } catch (error) {
    logger.debug(`producto: ${JSON.stringify(req.body)}`);
    logger.error(error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ success: false, msg: error });
  }
};

const obtenerProducto = async (req, res) => {
  const { codigo } = req.params;
  try {
    const producto = await consultarProducto(codigo);
    res.status(StatusCodes.OK).send(JSON.stringify(producto));
  } catch (error) {
    logger.error(`error al obtener el producto ${error}`);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ success: false, msg: error.message });
  }
};
const modificarProducto = async (req, res) => {
  try {
    await editarProducto(req.body);
    res.redirect('../vistas/producto/listado');
  } catch (error) {
    logger.error(`Ocurrió un error al modificar Producto: ${error}`);
    throw error;
  }
};

module.exports = {
  registrarProducto,
  obtenerTablaProductos,
  obtenerProducto,
  modificarProducto,
};
