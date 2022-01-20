$(document).ready(() => {
  const now = new Date();
  const dia = `0${now.getDate()}`.slice(-2);
  const mes = `0${now.getMonth() + 1}`.slice(-2);
  const hoy = `${now.getFullYear()}-${mes}-${dia}`;
  $('#dtpFechaNacimiento').val(hoy);
});

function validar() {
  const fechaSistema = () => {
    const fecha = new Date();
    return `${fecha.getFullYear()}-${fecha.getMonth() + 1}-${fecha.getDay()}`;
  };
  const nombre = $('#txtNombre').val();
  const apellido = $('#txtApellido').val();
  const fechaNacimiento = $('#dtpFechaNacimiento').val();
  const documento = $('#txtDocumento').val();
  const direccion = $('#txtDireccion').val();
  const localidad = $('#cboLocalidad').val();
  const telefono = $('#txtTelefono').val();
  const email = $('#txtEmail').val();

  const mensaje = [];
  let pasa = true;

  if (nombre === null || nombre.length === 0 || /^\s+$/.test(nombre)) {
    mensaje.push('Nombre');
    pasa = false;
  }

  if (apellido === null || apellido.length === 0 || /^\s+$/.test(apellido)) {
    mensaje.push(' Apellido');
    pasa = false;
  }
  if (!fechaNacimiento || fechaSistema() <= fechaNacimiento) {
    mensaje.push(' Fecha nacimiento');
    pasa = false;
  }
  if (direccion === null || direccion.length === 0 || /^\s+$/.test(direccion)) {
    mensaje.push(' Direccion');
    pasa = false;
  }

  if (localidad === null || localidad === -1) {
    mensaje.push(' Localidad');
    pasa = false;
  }

  if (telefono === null || telefono.length === 0 || /^\s+$/.test(telefono)) {
    mensaje.push(' Telefono');
    pasa = false;
  }

  if (!/\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+(\w+)/.test(email)) {
    mensaje.push(' Email');
    pasa = false;
  }
  if (!pasa) {
    swal({
      title: 'Error!',
      text: `Estos campos no han sido rellenados o no fueron cargados debidamente: \n${mensaje}`,
      icon: 'error',
    });
    return pasa;
  }
  swal({
    title: 'Fabuloso!',
    text: `Los datos han sido registrados correctamente`,
    icon: 'success',
  });
  return pasa;
}
function deshabilitar(estado) {
  const nom = document.getElementById('txtNombre');
  const ape = document.getElementById('txtApellido');
  const fecNac = document.getElementById('dtpFechaNacimiento');
  const dir = document.getElementById('txtDireccion');
  const loc = document.getElementById('txtLocalidad');
  const tel = document.getElementById('txtTelefono');
  const mail = document.getElementById('txtEmail');
  nom.disabled = estado;
  ape.disabled = estado;
  fecNac.disabled = estado;
  dir.disabled = estado;
  loc.disabled = estado;
  tel.disabled = estado;
  mail.disabled = estado;
}

function estadoCLiente() {
  const estados = document.getElementById('cboEstado').value;
  if (estados === 0) {
    $('#txtNombre').prop('disabled', false);
    $('#txtApellido').removeAttr('disabled');
    $('#dtpFechaNacimiento').prop('disabled', false);
    $('#txtDireccion').prop('disabled', false);
    $('#txtLocalidad').prop('disabled', false);
    $('#txtTelefono').prop('disabled', false);
    $('#txtEmail').prop('disabled', false);
  } else deshabilitar(true);
}
