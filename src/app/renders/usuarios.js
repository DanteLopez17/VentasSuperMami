const { consultarUsuario, updateEstado } = require('../querys/usuario-querys');
const logger = require('../utils/logger');

const renderListadoUsuario = async (req, res) => {
  try {
    const { user } = req;
    res.render('usuarios/listar-usuarios', { usuario: user });
  } catch (error) {
    logger.error(`Ocurrio un error al renderizar el listado de usuarios: ${error}`);
  }
};

const renderAltaUsuario = (req, res) => {
  const { user } = req;
  res.render('usuarios/alta', { usuario: user });
};

const renderEditarUsuario = async (req, res) => {
  try {
    const { legajo } = req.params;
    const { user } = req;
    const usuario = await consultarUsuario(legajo);
    res.render('usuarios/editar', { usuarios: usuario, usuario: user });
  } catch (error) {
    logger.error(`Ocurrio un error al consultar pantalla editar usuario: ${error}`);
  }
};
const renderConfirmarUsu = async (req, res) => {
  try {
    const { idUsuario } = req.params;
    const { idEstado } = req.params;
    await updateEstado(idUsuario, idEstado);
    res.redirect('../../listado');
  } catch (error) {
    logger.error(`Ocurrio un error al confirmar Cabecera y Detalle: ${error}`);
  }
};

module.exports = {
  renderListadoUsuario,
  renderEditarUsuario,
  renderAltaUsuario,
  renderConfirmarUsu,
};
