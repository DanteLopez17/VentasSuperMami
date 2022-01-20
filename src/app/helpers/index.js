const formatoEntidad = require('./formato-entidad');
const formatoFecha = require('./formato-fecha');

module.exports = {
  ...formatoEntidad,
  ...formatoFecha,
};
