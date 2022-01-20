const logger = require('../utils/logger');

const renderLogin = async (req, res) => {
  try {
    res.render('login/login');
  } catch (error) {
    logger.error(`Ocurrio un error al renderizar el login: ${error}`);
  }
};

module.exports = {
  renderLogin,
};
