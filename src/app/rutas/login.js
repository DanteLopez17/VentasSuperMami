const express = require('express');
const passport = require('passport');
const { renderLogin } = require('../renders/login');

const routerMethod = express.Router();

routerMethod.post(
  '/',
  passport.authenticate('local', {
    successRedirect: '../vistas/producto/listado',
    failureRedirect: '/login',
    badRequestMessage: 'Complete las credenciales',
    failureFlash: true,
  }),
);

routerMethod.get('/', renderLogin);

module.exports = routerMethod;
