const { StatusCodes } = require('http-status-codes');
const { consultarTablaReporte } = require('../querys/reporte-querys');
const logger = require('../utils/logger');

const obetenerTablaReporte = async (req, res) => {
  try {
    const { idtipo, idSumariza, idDesde, idHasta, Estado } = req.params;
    const tablaReporte = await consultarTablaReporte(
      idtipo,
      idSumariza,
      idDesde,
      idHasta,
      Estado,
    );
    res.status(StatusCodes.OK).send(JSON.stringify(tablaReporte[0]));
  } catch (error) {
    logger.error(`error al obtener tabla productos ${error}`);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ success: false, msg: error.message });
  }
};

module.exports = {
  obetenerTablaReporte,
};
