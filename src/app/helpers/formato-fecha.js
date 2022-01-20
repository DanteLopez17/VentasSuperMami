const formatearFecha = (date) => {
  const offset = date.getTimezoneOffset();
  const dateRetorno = new Date(date.getTime() - offset * 60 * 1000);
  return dateRetorno.toISOString().split('T')[0];
};

module.exports = {
  formatearFecha,
};
