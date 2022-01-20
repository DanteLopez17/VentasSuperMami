const { createLogger, format, transports } = require('winston');
const { version } = require('../../../package.json');

module.exports = createLogger({
  format: format.combine(
    format.simple(),
    format.timestamp(),
    format.printf(
      (info) =>
        `TPI_MSI v.${version} - [${info.timestamp}] - ${info.level}: ${info.message}`,
    ),
  ),
  transports: [
    new transports.File({
      maxsize: 5120000,
      maxFiles: 5,
      filename: `${__dirname}/../logs/log-api.log`,
    }),
    new transports.Console({
      level: 'debug',
    }),
  ],
});
