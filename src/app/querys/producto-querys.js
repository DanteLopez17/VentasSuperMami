const { conexion } = require('../database/conexion');
const logger = require('../utils/logger');

const transaccionProducto = async ({
  marca,
  nombre,
  stock,
  precioUnitario,
  medida,
  descripcion,
  activo = 1,
  idProveedor,
}) => {
  try {
    const producto = await conexion.query(
      'CALL ventas.sp_update_producto (?,?,?,?,?,?,?,?)',
      [marca, nombre, stock, precioUnitario, medida, descripcion, activo, idProveedor],
    );
    return producto;
  } catch (error) {
    logger.error(`Ocurrio un error al intentar la transaccion de producto: ${error}`);
    throw error;
  }
};
const consultarTablaProductos = async () => {
  try {
    const producto = await conexion.query(
      `SELECT p.descripcion, p.codigo,p.nombre as nombre,p.stock,p.precioUnitario,p.idProveedor,p.medida,p.activo,upper(pro.nombre) as nombrePro, es.estado from productos p join proveedores pro on p.idProveedor = pro.idProveedor join estados es on es.idEstado = p.activo order by estado desc, p.nombre`,
    );
    return producto;
  } catch (error) {
    logger.error(`Ocurrió un error al listar los productos: ${error}`);
    throw error;
  }
};

const editarProducto = async ({
  codigo,
  activo,
  marca,
  nombre,
  stock,
  precio,
  medida,
  descripcion,
  idProveedor,
}) => {
  try {
    const producto = await conexion.query(
      'CALL ventas.sp_modificar_Producto (?,?,?,?,?,?,?,?,?)',
      [nombre, marca, stock, precio, medida, descripcion, idProveedor, activo, codigo],
    );
    return producto;
  } catch (error) {
    logger.error(`Ocurrio un error al intentar modificar el producto`);
    throw error;
  }
};

const consultarProducto = async (codigo) => {
  try {
    const producto = await conexion.query(
      `SELECT * FROM productos  p  join estados es on p.activo=es.idEstado WHERE p.codigo = ?`,
      codigo,
    );
    return producto[0];
  } catch (error) {
    logger.error(`Sucedió un error al consultar el producto: ${error}`);
    throw error;
  }
};

const updateEstado = async (idProd, idEstado) => {
  try {
    const estadoProducto = await conexion.query(`CALL  update_estado_prod(?,?)`, [
      idProd,
      idEstado,
    ]);
    return estadoProducto;
  } catch (error) {
    logger.error(`Ocurrió un error al Updatear el estado: ${error}`);
    throw error;
  }
};

module.exports = {
  transaccionProducto,
  consultarTablaProductos,
  editarProducto,
  consultarProducto,
  updateEstado,
};
