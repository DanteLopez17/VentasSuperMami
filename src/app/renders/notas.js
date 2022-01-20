const {
  consultarTablaNotaPedidos,
  mostrarCabeceraNota,
  updateEstado,
} = require('../querys/nota-querys');
const logger = require('../utils/logger');

const renderEditarPedido = async (req, res) => {
  try {
    const { user } = req;
    const { idNota } = req.params;
    const cabecera = await consultarTablaNotaPedidos(idNota);
    res.render('notas/editar', { Cabecera: cabecera, usuario: user });
  } catch (error) {
    logger.error(`Ocurrio un error en render Notas: ${error}`);
  }
};

const renderAltaNota = (req, res) => {
  const { user } = req;
  res.render('notas/alta', { usuario: user });
};
const renderListadoNota = async (req, res) => {
  try {
    const { user } = req;
    res.render('notas/listar-notas', { usuario: user });
  } catch (error) {
    logger.error(`Ocurrio un error al renderizar el listado de Nota de Pedido: ${error}`);
  }
};

const renderMostarCabecera = async (req, res) => {
  try {
    const { user } = req;
    const { idNota } = req.params;
    const cabecera = await mostrarCabeceraNota(idNota);
    res.render('notas/editar', { Cabecera: cabecera, usuario: user });
  } catch (error) {
    logger.error(`Ocurrio un error al consultar pantalla mostrar Cabecera: ${error}`);
  }
};

const renderConfirmar = async (req, res) => {
  try {
    const idNota = req.params.idNota;
    const idEstado = req.params.idEstado;
    const cabecera = await updateEstado(idNota, idEstado);
    res.redirect('../../listado');
  } catch (error) {
    logger.error(`Ocurrio un error al confirmar Cabecera y Detalle: ${error}`);
  }
};

module.exports = {
  renderAltaNota,
  renderListadoNota,
  renderMostarCabecera,
  renderConfirmar,
  renderEditarPedido,
};
