const { conexion } = require('../database/conexion');
const logger = require('../utils/logger');

const consultarTablaReporte = async (idtipo, idSumariza, idDesde, idHasta, Estado) => {
  try {
    const reporte = await conexion.query(`Call reportes(?,?,?,?,?)`, [
      idtipo,
      idSumariza,
      idDesde,
      idHasta,
      Estado,
    ]);
    return reporte;
  } catch (error) {
    logger.error(`Ocurrió un error al listar los productos: ${error}`);
    throw error;
  }
};

module.exports = {
  consultarTablaReporte,
};
