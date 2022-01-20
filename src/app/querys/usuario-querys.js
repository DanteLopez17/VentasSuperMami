const { conexion } = require('../database/conexion');
const { hashPassword } = require('../helpers/formato-entidad');
const logger = require('../utils/logger');
const { insertarRegistro } = require('./common-querys');

const transaccionUsuario = async (dataPersona, dataUsuario) => {
  try {
    await conexion.beginTransaction();
    const idPersona = await insertarRegistro(dataPersona, 'personas');
    const dataUsuarioConIdPersona = {
      ...dataUsuario,
      idPersona,
    };
    const id = await insertarRegistro(dataUsuarioConIdPersona, 'usuarios');
    await conexion.commit();
    logger.info(`el usuario con id ${id} fue registrado con éxito`);
    return id;
  } catch (error) {
    logger.error(`error en transaccion ${error}`);
    await conexion.rollback();
    logger.info('se realizo rollback para preservar datos');
    throw error.sqlMessage;
  }
};

const consultarUsuario = async (legajo) => {
  try {
    const usuario = await conexion.query(
      `SELECT u.legajo,
      u.idPersona,
      u.idRol,
      u.activo,
      u.dadoBajaPor,
      u.FechaAlta,
      u.FechaBaja,
      u.password,
      p.nombre,
      p.apellido,
      p.direccion,
      p.email,
      p.FechaNacimiento,
      p.telefono,
      p.idLocalidad,
      l.localidad,
      r.descripcion
      FROM usuarios u JOIN personas p ON u.idPersona = p.idPersona 
					JOIN roles as r ON r.idRol = u.idRol 
          JOIN localidades l on p.idLocalidad = l.idLocalidad
      WHERE u.legajo = ?`,
      legajo,
    );

    return usuario[0];
  } catch (error) {
    logger.error(`Sucedió un error al consultar usuario: ${error}`);
    throw error;
  }
};

const consultarTablaUsuarios = async () => {
  try {
    const usuarios = await conexion.query(
      `SELECT u.activo, u.legajo,  p.apellido, p.nombre, r.descripcion , p.direccion, p.email , u.idPersona from usuarios as u join personas as p ON u.idPersona = p.idPersona join roles as r on r.idRol = u.idRol`,
    );
    return usuarios;
  } catch (error) {
    logger.error(`Ocurrió un error al listar los usuarios: ${error}`);
    throw error;
  }
};

const modificarUsuario = async ({
  persona,
  legajo,
  password,
  nombre,
  apellido,
  direccion,
  email,
  telefono,
  activo,
}) => {
  try {
    const hashedPassword = hashPassword(password);
    const usuarioModificado = await conexion.query(
      'call ventas.sp_update_usuario(?,?,?,?,?,?,?,?,?)',
      [
        persona,
        legajo,
        hashedPassword,
        nombre,
        apellido,
        direccion,
        email,
        telefono,
        activo,
      ],
    );
    return usuarioModificado;
  } catch (error) {
    logger.error(`Ocurrio un error al intentar modificar el usuario: ${error}`);
    throw error;
  }
};

const updateEstado = async (idUsuario, idEstado) => {
  try {
    const usu = await conexion.query(`CALL  update_estado_usu(?,?)`, [
      idUsuario,
      idEstado,
    ]);
    return usu;
  } catch (error) {
    logger.error(`Ocurrió un error al Updatear el estado: ${error}`);
    throw error;
  }
};

module.exports = {
  transaccionUsuario,
  consultarUsuario,
  consultarTablaUsuarios,
  modificarUsuario,
  updateEstado,
};
