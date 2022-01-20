const { response } = require('express');

const checkAuthenticated = (req, res = response, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.redirect('/');
};

const checkNotAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    res.redirect('/');
  }
  return next();
};

const middEsAdministrador = (req, res, next) => {
  const { user } = req;
  if (user.esAdministrador) {
    return next();
  }
  return res.redirect('/');
};

const middEsMiUsuario = (req, res, next) => {
  const { legajo } = req.params;
  const { user } = req;
  if (!user.esAdministrador) {
    if (legajo === user.legajo) next();
    else res.redirect('/');
  }
  next();
};

module.exports = {
  checkAuthenticated,
  checkNotAuthenticated,
  middEsAdministrador,
  middEsMiUsuario,
};
