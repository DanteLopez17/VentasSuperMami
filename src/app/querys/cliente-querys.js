const { conexion } = require('../database/conexion');
const logger = require('../utils/logger');
const { insertarRegistro } = require('./common-querys');

const transaccionCliente = async (dataPersona, dataCliente) => {
  try {
    await conexion.beginTransaction();
    const idPersona = await insertarRegistro(dataPersona, 'personas');
    const dataClienteConIdPersona = {
      ...dataCliente,
      idPersona,
    };
    const id = await insertarRegistro(dataClienteConIdPersona, 'clientes');
    await conexion.commit();
    logger.info(`el cliente con id ${id} fue registrado con éxito`);
    return id;
  } catch (error) {
    logger.error(`error en transaccion insertar Registro ${error}`);
    await conexion.rollback();
    logger.info('se realizo rollback para preservar datos');
    throw error.sqlMessage;
  }
};

const consultarTablaClientes = async () => {
  try {
    const clientes = await conexion.query(
      `SELECT * from listadoClientes order by estado desc`,
    );
    return clientes;
  } catch (error) {
    logger.error(`Ocurrió un error al consultar tabla Clientes: ${error}`);
    throw error;
  }
};

const consultarCliente = async (idCliente) => {
  try {
    const cliente = await conexion.query(
      `SELECT 
            e.estado,
            c.activo,
              c.idCliente,
              p.idPersona, 
              p.nombre, 
              p.apellido, 
              p.FechaNacimiento, 
              p.direccion, 
              l.idLocalidad, 
              l.localidad,
              p.telefono, 
              p.email,
              c.activo
            FROM clientes c
              JOIN personas p on p.idPersona = c.idPersona
              JOIN localidades l on l.idLocalidad = p.idLocalidad
              JOIN estados e on e.idEstado = c.activo
            WHERE idCliente = ?`,
      idCliente,
    );
    return cliente[0];
  } catch (error) {
    logger.error(`Sucedió un error al consultar el cliente: ${error}`);
    throw error;
  }
};

const modificarCliente = async ({
  cliente,
  activo,
  nombre,
  apellido,
  FechaNacimiento,
  direccion,
  Idlocalidad,
  telefono,
  email,
}) => {
  try {
    const clienteModificado = await conexion.query(
      ` CALL ventas.sp_Update_Cliente(?,?,?,?,?,?,?,?,?)`,
      [
        nombre,
        apellido,
        FechaNacimiento,
        direccion,
        email,
        telefono,
        Idlocalidad,
        1,
        cliente,
      ],
    );
    return clienteModificado;
  } catch (error) {
    logger.error(` Ocurrio un error al intentar modificar el cliente: ${error}`);
    throw error;
  }
};
const updateEstado = async (idCli, idEstado) => {
  try {
    const cli = await conexion.query(`CALL  update_estado_cli(?,?)`, [idCli, idEstado]);
    return cli;
  } catch (error) {
    logger.error(`Ocurrió un error al Updatear el estado: ${error}`);
    throw error;
  }
};
module.exports = {
  transaccionCliente,
  consultarTablaClientes,
  consultarCliente,
  modificarCliente,
  updateEstado,
};
