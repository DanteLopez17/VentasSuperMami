/* eslint-disable no-undef */
$(document).ready(() => {
  function deshabilitar() {
    const rol = document.getElementById('cboRol');
    const nom = document.getElementById('txtNombre');
    const ape = document.getElementById('txtApellido');
    const fecNac = document.getElementById('dtpFechaNacimiento');
    const dir = document.getElementById('txtDireccion');
    const loc = document.getElementById('txtLocalidad');
    const tel = document.getElementById('txtTelefono');
    const mail = document.getElementById('txtEmail');
    const pass = document.getElementById('txtPass');
    const confPass = document.getElementById('txtPassConf');
    rol.disabled = true;
    nom.disabled = true;
    ape.disabled = true;
    fecNac.disabled = true;
    dir.disabled = true;
    loc.disabled = true;
    tel.disabled = true;
    mail.disabled = true;
    pass.disabled = true;
    confPass.disabled = true;
  }
  function estados() {
    const estadoUser = $('#cboEstado').val();
    if (estadoUser === 1) {
      $('#cboRol').prop('disabled', false);
      $('#txtNombre').prop('disabled', false);
      $('#txtApellido').removeAttr('disabled');
      $('#dtpFechaNacimiento').prop('disabled', false);
      $('#txtDireccion').prop('disabled', false);
      $('#txtLocalidad').prop('disabled', false);
      $('#txtTelefono').prop('disabled', false);
      $('#txtEmail').prop('disabled', false);
      $('#txtPass').prop('disabled', false);
      $('#txtPassConf').prop('disabled', false);
    } else deshabilitar();
  }
});
function deshabilitar() {
  $('#cboRol').prop('disabled', true);
  $('#txtNombre').prop('disabled', true);
  $('#txtApellido').removeAttr('disabled');
  $('#dtpFechaNacimiento').prop('disabled', true);
  $('#txtDireccion').prop('disabled', true);
  $('#cboLocalidad').prop('disabled', true);
  $('#txtTelefono').prop('disabled', true);
  $('#txtEmail').prop('disabled', true);
  $('#txtPass').prop('disabled', true);
  $('#txtPassConf').prop('disabled', true);
}
function estados() {
  if ($('#cboEstado').val() === 0) {
    $('#cboRol').prop('disabled', false);
    $('#txtNombre').prop('disabled', false);
    $('#txtApellido').removeAttr('disabled');
    $('#dtpFechaNacimiento').prop('disabled', false);
    $('#txtDireccion').prop('disabled', false);
    $('#cboLocalidad').prop('disabled', false);
    $('#txtTelefono').prop('disabled', false);
    $('#txtEmail').prop('disabled', false);
    $('#txtPass').prop('disabled', false);
    $('#txtPassConf').prop('disabled', false);
  } else deshabilitar();
}
