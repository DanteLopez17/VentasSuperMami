const logger = require('../utils/logger');
const { consultarProducto, updateEstado } = require('../querys/producto-querys');

const renderAltaProducto = (req, res) => {
  const { user } = req;
  res.render('productos/alta', { usuario: user });
};
const renderListadoProductos = async (req, res) => {
  try {
    const { user } = req;
    res.render('productos/listar-productos', { usuario: user });
  } catch (error) {
    logger.error(`Ocurrio un error al renderizar el listado de productos: ${error}`);
    throw error;
  }
};
const renderObtenerProducto = async (req, res) => {
  try {
    const { user } = req;
    const { codigo } = req.params;
    const producto = await consultarProducto(codigo);
    res.render('productos/editar', { productos: producto, usuario: user });
  } catch (error) {
    logger.error(`Ocurrio un error al consultar pantalla editar producto: ${error}`);
    throw error;
  }
};
const renderConfirmarProducto = async (req, res) => {
  try {
    const { idProd } = req.params;
    const { idEstado } = req.params;
    await updateEstado(idProd, idEstado);
    res.redirect('../../listado');
  } catch (error) {
    logger.error(`Ocurrio un error al confirmar Cabecera y Detalle: ${error}`);
    throw error;
  }
};
module.exports = {
  renderAltaProducto,
  renderListadoProductos,
  renderObtenerProducto,
  renderConfirmarProducto,
};
