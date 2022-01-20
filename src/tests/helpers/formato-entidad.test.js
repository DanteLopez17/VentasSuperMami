const { formatearUsuario, formatearFecha } = require('../../app/helpers');

jest.mock('../../app/helpers/formato-fecha');

test('formatear usuario debería retornar objeto formateado', () => {
  // given
  const params = {
    legajo: 109233,
    password: 'myPassword123',
  };
  // when
  const result = formatearUsuario(params);
  // then
  expect(formatearFecha).toHaveBeenCalledTimes(1);
  expect(result).toBeDefined();
  expect(result).toHaveProperty('FechaAlta');
  expect(result).toHaveProperty('FechaBaja', null);
  expect(result).toHaveProperty('activo', true);
  expect(result).toHaveProperty('dadoBajaPor', null);
  expect(result).toHaveProperty('legajo');
  expect(result).toHaveProperty('password');
  expect(result).toHaveProperty('idRol', 2);
});

test('formatear usuario debería throwear error al no pasar legajo', () => {
  const params = {
    legajo: '',
    password: 'myPassword123',
  };
  expect(() => {
    formatearUsuario(params);
  }).toThrowError('no se agregó el legajo');
});

test('formatear usuario debería throwear error al no pasar contraseña', () => {
  const params = {
    legajo: 109233,
    password: '',
  };
  expect(() => {
    formatearUsuario(params);
  }).toThrowError('no se agregó la contraseña');
});
