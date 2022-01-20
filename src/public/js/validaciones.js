function validarLogin() {
  const leg = document.frmLogin.txtLegajo.value;
  const pass = document.frmLogin.txtPassword.value;
  let pasa = true;
  const mensajeError = [];
  if (leg === null || leg === '') {
    mensajeError.push('Falta completar el legajo');
    pasa = false;
  }
  if (pass === null || pass === '') {
    mensajeError.push('Falta completar la contraseña');
    pasa = false;
  }
  if (!pasa) {
    mensajeError.join(', ');
    alert(mensajeError);
  }
  return pasa;
}
