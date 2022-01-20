const { conexion } = require('../database/conexion');
const logger = require('../utils/logger');

const consultarTablaNotaPedidos = async (idNotaPedido) => {
  try {
    const pedido = await conexion.query(
      `CALL listadoDetalleNotaPedidoXnum(?)`,
      idNotaPedido,
    );
    return pedido;
  } catch (error) {
    logger.error(`Ocurrió un error en consultar Tabla nota de pedidos: ${error}`);
    throw error;
  }
};

const transaccionProductoNota = async ({
  legajo,
  codigoProducto,
  cantidad,
  precioUnitario,
}) => {
  try {
    const producto = await conexion.query('CALL sp_insert_producto_detalle (?,?,?,?)', [
      legajo,
      codigoProducto,
      cantidad,
      precioUnitario,
    ]);
    return producto;
  } catch (error) {
    logger.error(`Ocurrio un error al intentar insertar el producto: ${error}`);
    throw error;
  }
};
const consultarTablaNotaProductos = async () => {
  try {
    const producto = await conexion.query(`CALL sp_select_prod_detalle(?)`, [1]);
    return producto;
  } catch (error) {
    logger.error(`Ocurrió un error al listar los productos del detalle: ${error}`);
    throw error;
  }
};
const elimniarProdDetalle = async (idDetalle) => {
  try {
    const productoEliminado = await conexion.query('call sp_delete_prod_deta(?)', [
      idDetalle,
    ]);
    return productoEliminado[0][0];
  } catch (error) {
    logger.error(`Ocurrio un error en notaQuery elimiinarProdDetalle: ${error}`);
    throw error;
  }
};
const editarProdDetalle = async (idDetaP, idNotaP, cant) => {
  try {
    const productoEditado = await conexion.query(
      'CALL sp_editar_prod_detalle(?, ?, ?);',
      [idDetaP, idNotaP, cant],
    );
    return productoEditado[0][0];
  } catch (error) {
    logger.error(`Ocurrio un error en notaQuery editarProdDetalle: ${error}`);
    throw error;
  }
};

const modificarDetalleProducto = async (idDetalle) => {
  try {
    const productoDetalleEdi = await conexion.query(
      'CALL sp_consultarProductoDetalle(?)',
      idDetalle,
    );
    return productoDetalleEdi[0][0];
  } catch (error) {
    logger.error(`Ocurrio un error en notaQuery editarProductoDetalle: ${error}`);
    throw error;
  }
};

const cargaNombre = async (nombre2) => {
  try {
    const nombre = await conexion.query(
      `SELECT c.idCliente   , concat(p.nombre, '  ' , p.apellido) as NombreCompleto ,p.idPersona  from personas as p join clientes as c on c.idPersona = p.idPersona where p.nombre LIKE  ? '%' group by c.idCliente`,
      [nombre2],
    );
    return nombre;
  } catch (error) {
    logger.error(`Ocurrió un error al listar el detalle: ${error}`);
    throw error;
  }
};

const cargaDetalle = async (idNota, idProd, cantidad, precioUnitario) => {
  try {
    const nombre = await conexion.query(`CALL nuevoDetalle2(?,?,?,?)`, [
      idNota,
      idProd,
      cantidad,
      precioUnitario,
    ]);

    return nombre;
  } catch (error) {
    logger.error(`Ocurrió un error al listar el detalle: ${error}`);
    throw error;
  }
};

const cargaCabecera = async (idCliente, legajo) => {
  try {
    const cabecera = await conexion.query(`CALL  nuevaNotaPedido(?,?)`, [
      idCliente,
      legajo,
    ]);
    return cabecera[0][0].idNota;
  } catch (error) {
    logger.error(`Ocurrió un error al listar el detalle: ${error}`);
    throw error;
  }
};

const consultarNotasPedido = async (fecha1, fecha2, estado) => {
  try {
    const producto = await conexion.query(
      `
      CALL sp_listado_filtros(?,?,?)`,
      [fecha1, fecha2, estado],
    );
    return producto[0];
  } catch (error) {
    logger.error(`Ocurrió un error al listar los productos del detalle: ${error}`);
    throw error;
  }
};

const mostrarCabeceraNota = async (idNota) => {
  try {
    const cabeceraNota = await conexion.query(
      `select  dnp.idDetalle 'idDetalle',
		  np.idNotaPedido'NotaPedido',
      es.estado'EstadoNP',
          np.fecha'Fecha',
      us.idPersona'idUsuario', 
      (select per.apellido from personas per where per.idPersona = us.idPersona)'Usuario',
      cl.idPersona'idCliente',
      (select concat(per.apellido , ' ' , per.nombre) from personas per where per.idPersona = cl.idPersona)'Cliente',
          (select concat( per.direccion , ' - ' , lo.localidad , ' - ' , de.departamento) from personas per join localidades lo on per.idLocalidad = lo.idLocalidad
                  join departamentos de on de.idDepartamento = lo.idDepartamento
                  where per.idPersona = cl.idPersona)'direccionCliente'
      
      from notapedidos np join clientes cl on cl.idCliente = np.idCliente
      join estados es on es.idEstado = np.idEstado
      join usuarios us on us.legajo = np.legajo
      join personas pe on pe.idPersona = cl.idPersona
      join detallenotapedidos dnp on dnp.idNotaPedido = np.idNotaPedido
      where np.idNotapedido = ?`,
      idNota,
    );
    return cabeceraNota[0];
  } catch (error) {
    logger.error(`Sucedió un error al consultar cabecera notaQuerys: ${error}`);
    throw error;
  }
};

const updateEstado = async (idNota, idEstado) => {
  try {
    const cabecera = await conexion.query(`CALL  update_estado(?,?)`, [idNota, idEstado]);
    return cabecera;
  } catch (error) {
    logger.error(`Ocurrió un error al Updatear el estado: ${error}`);
    throw error;
  }
};
module.exports = {
  consultarTablaNotaPedidos,
  transaccionProductoNota,
  consultarTablaNotaProductos,
  elimniarProdDetalle,
  cargaNombre,
  cargaCabecera,
  cargaDetalle,
  consultarNotasPedido,
  mostrarCabeceraNota,
  editarProdDetalle,
  modificarDetalleProducto,
  updateEstado,
};
