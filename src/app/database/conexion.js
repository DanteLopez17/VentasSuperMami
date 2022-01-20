const config = require('config');
const mysql = require('mysql');
const { promisify } = require('util');
const logger = require('../utils/logger');

const conexion = mysql.createConnection(config.get('database'));

conexion.connect((err) => {
  if (err) {
    logger.error(`Ocurrió un error al conectarse a la base de datos: ${err.stack}`);
    return;
  }
  logger.info(`la conexion a la base de datos fue exitosa. Id: ${conexion.threadId}`);
});

conexion.query = promisify(conexion.query);
module.exports = {
  conexion,
};
