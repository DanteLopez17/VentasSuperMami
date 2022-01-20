const { StatusCodes } = require('http-status-codes');
const {
  consultarProveedor,
  consultarTablaDni,
  consultarLocalidad,
  consultarNombreCliente,
  cargaNombreProducto,
} = require('../querys/combo-querys');
const logger = require('../utils/logger');

const obtenerComboProveedor = async (req, res) => {
  try {
    const proveedor = await consultarProveedor();
    res.status(StatusCodes.OK).send(JSON.stringify(proveedor));
  } catch (error) {
    logger.error(`error al obtener combo proveedor ${error}`);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ success: false, msg: error.message });
  }
};

const obtenerComboDni = async (req, res) => {
  try {
    const dni = await consultarTablaDni();
    res.status(StatusCodes.OK).send(JSON.stringify(dni));
  } catch (error) {
    logger.error(`error al obtener combo dni ${error}`);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ success: false, msg: error.message });
  }
};

const obtenerComboLocalidad = async (req, res) => {
  try {
    const localidad = await consultarLocalidad();
    res.status(StatusCodes.OK).send(JSON.stringify(localidad));
  } catch (error) {
    logger.error(`error al obtener combo localidd ${error}`);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ success: false, msg: error.message });
  }
};

const obtenerComboNombreCliente = async (req, res) => {
  try {
    const { idCliente } = req.params;
    const nombreCliente = await consultarNombreCliente(idCliente);
    res.status(StatusCodes.OK).send(JSON.stringify(nombreCliente[0]));
  } catch (error) {
    logger.error(`Ocurrió un error al obtener comvo nombreCliente: ${error}`);
    throw error;
  }
};

const consultarNombreProducto = async (req, res) => {
  try {
    const nombreProd = req.body.term.term;
    const nombreProducto = await cargaNombreProducto(nombreProd);
    res.status(StatusCodes.OK).send(JSON.stringify(nombreProducto));
  } catch (error) {
    logger.error(`error al obtener combo nombreprod select 2 ${error}`);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ success: false, msg: error.message });
  }
};

module.exports = {
  obtenerComboDni,
  obtenerComboProveedor,
  obtenerComboLocalidad,
  obtenerComboNombreCliente,
  consultarNombreProducto,
};
