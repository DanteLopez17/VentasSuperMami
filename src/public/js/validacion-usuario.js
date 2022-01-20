$(document).ready(() => {
  const now = new Date();
  const dia = `0${now.getDate()}`.slice(-2);
  const mes = `0${now.getMonth() + 1}`.slice(-2);
  const hoy = `${now.getFullYear()}-${mes}-${dia}`;
  $('#dtpFechaNacimiento').val(hoy);
});

function validar() {
  const nombre = $('#txtNombre').val();
  const apellido = $('#txtApellido').val();
  const fechaNacimiento = $('#dtpFechaNacimiento').val();
  const documento = $('#txtDocumento').val();
  const direccion = $('#txtDireccion').val();
  const localidad = $('#cboLocalidad').val();
  const telefono = $('#txtTelefono').val();
  const email = $('#txtEmail').val();
  const pass = $('#txtPass').val();
  const passConfirm = $('#txtPassConf').val();

  const mensaje = [];
  let pasa = true;

  if (nombre === null || nombre.length === 0 || /^\s+$/.test(nombre) || !nombre) {
    mensaje.push('Nombre');
    pasa = false;
  }
  if (apellido === null || apellido.length === 0 || /^\s+$/.test(apellido) || !apellido) {
    mensaje.push(' apellido');
    pasa = false;
  }
  if (direccion === null || direccion.length === 0 || /^\s+$/.test(direccion)) {
    mensaje.push(' direccion');
    pasa = false;
  }
  if (localidad === null || localidad.length === 0) {
    mensaje.push(' localidad');
    pasa = false;
  }
  if (telefono === null || telefono.length === 0 || /^\s+$/.test(telefono)) {
    mensaje.push(' telefono');
    pasa = false;
  }
  if (!/\w+([-+.']\w+)*@\w+([-.]\w+)*\./.test(email)) {
    mensaje.push(' email');
    pasa = false;
  }
  if (pass.value === '') {
    pasa = false;
  }
  if (passConfirm === null || passConfirm.length === 0 || passConfirm !== pass) {
    mensaje.push(' contraseña de confirmacion');
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

function alerta() {
  Swal.fire({
    title: 'Seguro que desea modificar el Usuario',
    icon: 'question',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!',
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire('Modificado!', 'Usuario modificado con exito!', 'success');
    }
  });
}
