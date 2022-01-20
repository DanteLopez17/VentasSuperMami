const { conexion } = require('../database/conexion');
const logger = require('../utils/logger');

const insertarRegistro = async (data, nombreTabla) => {
  try {
    const id = await conexion.query(`INSERT INTO ${nombreTabla} SET ?`, data);
    return id.insertId;
  } catch (error) {
    logger.error(`Ocurrió un error al insertar registro: ${error.message}`);
    throw error;
  }
};

const consultarTabla = async (nombreTabla) => {
  try {
    const registros = await conexion.query(`SELECT * FROM ${nombreTabla}`);
    return registros;
  } catch (error) {
    logger.error(`Ocurrió un error al consultar tabla ${nombreTabla}: ${error.message}`);
    throw error;
  }
};

module.exports = {
  insertarRegistro,
  consultarTabla,
};
