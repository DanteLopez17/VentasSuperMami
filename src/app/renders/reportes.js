const logger = require('../utils/logger');

const renderReportes = async (req, res) => {
  try {
    const { user } = req;
    res.render('reportes/reporte', { usuario: user });
  } catch (error) {
    logger.error(`Ocurrio un error al renderizar el listado de Reportes: ${error}`);
    throw error;
  }
};

module.exports = {
  renderReportes,
};
