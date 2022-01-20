const { conexion } = require('../database/conexion');
const logger = require('../utils/logger');

const consultarProveedor = async () => {
  try {
    const proveedor = await conexion.query(
      `SELECT upper(nombre) as nombre , idProveedor from proveedores 
        `,
    );
    return proveedor;
  } catch (error) {
    logger.error(`Ocurrió un error al consultar los prooveedores: ${error}`);
    throw error;
  }
};
const consultarTablaDni = async () => {
  try {
    const dni = await conexion.query(`SELECT * from tiposdocumento`);
    return dni;
  } catch (error) {
    logger.error(`Ocurrió un error al consultar tabla dni: ${error}`);
    throw error;
  }
};

const consultarLocalidad = async () => {
  try {
    const localidad = await conexion.query(
      `SELECT idLocalidad ,localidad from localidades order by localidad`,
    );
    return localidad;
  } catch (error) {
    logger.error(`Ocurrió un error al consultar localidad: ${error}`);
    throw error;
  }
};

const consultarNombreCliente = async (idCliente) => {
  try {
    const cliente = await conexion.query(`CALL sp_consultar_nombre_cliente(?) `, [
      idCliente,
    ]);
    return cliente;
  } catch (error) {
    logger.error(
      `Ocurrió un error en combo-query al consultar el nombre del cliente: ${error}`,
    );
    throw error;
  }
};

const cargaNombreProducto = async (nombreProd) => {
  try {
    const nombreProducto = await conexion.query(
      `select codigo as codigo , concat(nombre,' ', marca)  as nombre from productos where nombre like ? '%'  `,
      [nombreProd],
    );
    return nombreProducto;
  } catch (error) {
    logger.error(`Ocurrió un error al cargar el producto: ${error}`);
    throw error;
  }
};
module.exports = {
  consultarProveedor,
  consultarTablaDni,
  consultarLocalidad,
  consultarNombreCliente,
  cargaNombreProducto,
};
