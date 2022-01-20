
function estadoProducto() {
    const estados = document.getElementById('cboEstado').value;
    if (estados === 0) {
      $('#txtCodigo').prop('disabled', false);
      $('#txtNombre').removeAttr('disabled');
      $('#txtMarca').prop('disabled', false);
      $('#txtStock').prop('disabled', false);
      $('#txtPrecio').prop('disabled', false);
      $('#txtMedida').prop('disabled', false);
      $('#txtDescripcion').prop('disabled', false);
      $('#cboProveedor').prop('disabled', false);
    } else deshabilitar(true);
  }