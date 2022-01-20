const { response } = require('express');
const config = require('config');
/** -------------------------------------------------------------------------------
*  async setCors(req, res) -
*  añade urls a la whitelist y las compara con las que originan la peticion. 
*  @param  { object }   req el request que contiene un header con informacion de la 
*                           url donde se origina la peticion
*  @param  { response } res response de la peticion, por default toma el valor del
*                           response de express.
*  @param  { function } next funcion propia del middleware que al ejecutarse pasa 
*                             al siguiente metodo
*  @return { void }
*                  On success : si la url se encuentra en la whitelist, permite 
*                               que el programa siga su ejecucion
*                  On error: caso contrario, no permite que el programa siga su ejecucion
*  @author Agustin Molas Demitropulos
*  @date   10/09/2021
------------------------------------------------------------------------------- */

const setCors = (req, res = response, next) => {
  const whitelist = config.get('whitelist');
  const { origin } = req.headers;
  const corsOptions = {
    origin: '',
    credentials: true,
  };
  if (whitelist.includes(origin)) {
    corsOptions.origin = origin;
  }
  res.locals.corsOptions = corsOptions;
  next();
};

module.exports = {
  setCors,
};
