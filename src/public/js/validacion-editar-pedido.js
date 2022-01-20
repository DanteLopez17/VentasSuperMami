$(document).ready(() => {
  const now = new Date();
  const dia = `0${now.getDate()}`.slice(-2);
  const mes = `0${now.getMonth() + 1}`.slice(-2);
  const hoy = `${now.getFullYear()}-${mes}-${dia}`;

  $('#dtpFechaAlta').val(hoy);
});
function validar() {
  const producto = $('#cboProducto').val();
  const legajo = $('#txtLegajoVendedor').val();
  const cantidad = $('#txtCantidad').val();
  const numCliente = $('#txtNumCliente').val();
  const nombreCliente = $('#txtNombreCliente').val();

  const mensaje = [];
  let pasa = true;

  if (producto === null || producto.length === 0 || /^\s+$/.test(producto)) {
    mensaje.push(' Producto');
    pasa = false;
  }
  if (legajo === null || legajo.length === 0 || /^\s+$/.test(legajo)) {
    mensaje.push(' Legajo');
    pasa = false;
  }
  if (cantidad === null || cantidad.length === 0 || /^\s+$/.test(cantidad)) {
    mensaje.push(' Cantidad');
    pasa = false;
  }
  if (numCliente === null || numCliente.length === 0 || /^\s+$/.test(numCliente)) {
    mensaje.push(' Numero de Cliente');
    pasa = false;
  }
  if (
    nombreCliente === null ||
    nombreCliente.length === 0 ||
    /^\s+$/.test(nombreCliente)
  ) {
    mensaje.push(' Nombre Cliente');
    pasa = false;
  }

  if (pasa) {
    swal('Datos correctos', 'Datos correctamente validados', 'success');
  } else {
    swal({
      title: 'Datos no ingresados',
      text: `${mensaje}`,
      icon: 'warning',
    });
  }
  return pasa;
}
