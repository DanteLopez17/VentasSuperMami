const { formatearFecha } = require('../../app/helpers');

test('debería retornar formato de fecha YYYY-MM-DD', () => {
  const result = formatearFecha(new Date('October 13, 2014 11:13:00'));
  expect(result).toStrictEqual('2014-10-13');
});
