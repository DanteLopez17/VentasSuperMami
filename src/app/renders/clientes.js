const { consultarCliente, updateEstado } = require('../querys/cliente-querys');
const logger = require('../utils/logger');

const renderAltaCliente = (req, res) => {
  const { user } = req;
  res.render('clientes/alta', { usuario: user });
};
const renderListadoClientes = async (req, res) => {
  try {
    const { user } = req;
    res.render('clientes/listar-clientes', { usuario: user });
  } catch (error) {
    logger.error(`Ocurrio un error al renderizar el listado de clientes: ${error}`);
  }
};

const renderEditarCliente = async (req, res) => {
  try {
    const { user } = req;
    const { idCliente } = req.params;
    const cliente = await consultarCliente(idCliente);
    res.render('clientes/editar', { Cliente: cliente, usuario: user });
  } catch (error) {
    logger.error(`Ocurrio un error al consultar pantalla editar el cliente: ${error}`);
  }
};
const renderConfirmarCliente = async (req, res) => {
  try {
    const { idCliente } = req.params;
    const { idEstado } = req.params;
    await updateEstado(idCliente, idEstado);
    res.redirect('../../listado');
  } catch (error) {
    logger.error(`Ocurrio un error al confirmar Cabecera y Detalle: ${error}`);
  }
};

module.exports = {
  renderAltaCliente,
  renderListadoClientes,
  renderEditarCliente,
  renderConfirmarCliente,
};
