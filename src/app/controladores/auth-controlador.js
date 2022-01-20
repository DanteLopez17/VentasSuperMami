/* eslint-disable no-unused-vars */
const bcrypt = require('bcrypt');
const { consultarUsuario } = require('../querys/usuario-querys');
const logger = require('../utils/logger');

/** -------------------------------------------------------------------------------
*  Busca un usuario en la base de datos que coincida con el legajo y la contraseña dados
*  en el body de la peticion, y genera un token si lo encuentra.
*  @param  { object }   req el request que contiene en su body el legajo y la contraseña
*                           del usuario a registrar
*  @param  { response } res response de la peticion, por default toma el valor del
*                           response de express.
*  @return { void }
*                  On success => devuelve status 200 con el legajo, el nombre y el token
*                                del usuario creado
*                  On error: loggea en consola el error encontrado y devuelve status
*                            success: false con info del error
*  @author Agustin Molas Demitropulos
*  @date   10/08/2021
------------------------------------------------------------------------------- */
const loginUsuario = async (legajo, password) => {
  try {
    const usuario = await consultarUsuario(legajo);
    const errorHandler = { success: true, msg: null };
    const msg = `Credenciales incorrectas`;
    if (!usuario) {
      errorHandler.success = false;
      errorHandler.msg = msg;
      return {
        errorHandler,
      };
    }
    const validPassword = bcrypt.compareSync(password, usuario.password);
    if (!validPassword) {
      errorHandler.success = false;
      errorHandler.msg = msg;
    }
    return {
      usuario,
      errorHandler,
    };
  } catch (error) {
    logger.error(error);
    throw error;
  }
};

const logoutUsuario = (req, res) => {
  req.logOut();
  res.redirect('/login');
};

module.exports = {
  loginUsuario,
  logoutUsuario,
};
