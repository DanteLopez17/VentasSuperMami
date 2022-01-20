const express = require('express');

const { renderReportes } = require('../../renders/reportes');

const routherMethod = express.Router();

// renders

routherMethod.get('/alta', renderReportes);

module.exports = routherMethod;
