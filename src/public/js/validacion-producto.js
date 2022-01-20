window.addEventListener('load', (event) => {
  event.preventDefault();
  $.ajax({
    url: 'http://localhost:4000/combos/combo',
    type: 'GET',
    dataType: 'json',

    success(result) {
      const cuit = result;
      for (let i = 0; i < cuit.length; i++) {
        let html = '<option value= ';
        html += cuit[i].idProveedor;
        html += '>';
        html += `${cuit[i].nombre}</option>`;

        $('#cboProveedor').append(html);
      }
    },
    error(XMLHttpRequest, textStatus, errorThrown) {
      if (textStatus == 'Unauthorized') {
        alert(`custom message. Error: ${errorThrown}`);
      } else {
        alert(`custom message. Error: ${errorThrown}`);
      }
    },
  });
});

function validar() {
  const nombre = $('#txtNombre').val();
  const marca = $('#txtMarca').val();
  const stock = $('#txtStock').val();
  const precioUnitario = $('#txtPrecio').val();
  const medida = $('#txtMedida').val();
  const descripcion = $('#textDescripcion').val();
  const proveedor = $('#cboProveedor').val();

  const mensaje = [];
  let pasa = true;

  if (nombre === null || nombre.length === 0 || /^\s+$/.test(nombre)) {
    mensaje.push('Nombre');
    pasa = false;
  }

  if (marca === null || marca.length === 0 || /^\s+$/.test(marca)) {
    mensaje.push(' Marca');
    pasa = false;
  }
  if (stock === null || stock.length === 0 || /^\s+$/.test(stock)) {
    mensaje.push(' Stock');
    pasa = false;
  }
  if (
    precioUnitario === null ||
    precioUnitario.length === 0 ||
    /^\s+$/.test(precioUnitario)
  ) {
    mensaje.push(' Precio unitario');
    pasa = false;
  }
  if (proveedor === null || proveedor === -1) {
    mensaje.push(' Proveedor');
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
