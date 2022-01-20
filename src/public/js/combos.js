window.addEventListener('load', (event) => {
  event.preventDefault();

  $.ajax({
    url: 'http://localhost:4000/combos/comboLocalidad',
    type: 'GET',
    dataType: 'json',

    success(result) {
      const localidad = result;
      for (let i = 0; i < localidad.length; i++) {
        let html = '<option value= ';
        html += localidad[i].idLocalidad;
        html += '>';
        html += `${localidad[i].localidad}</option>`;

        $('#cboLocalidad').append(html);
      }
    },
    error(result) {
      swal({
        title: 'Error!',
        text: `No se ha podido cargar las Categorias${result}`,
        icon: 'error',
      });
    },
  });
  event.preventDefault();
  $.ajax({
    url: 'http://localhost:4000/combos/comboDni',
    type: 'GET',
    dataType: 'json',

    success(result) {
      const dni = result;

      for (let i = 0; i < dni.length; i++) {
        let html = '<option value= ';
        html += dni[i].idtipoDocumento;
        html += '>';
        html += `${dni[i].tipoDocumento}</option>`;

        $('#cboTipoDocumento').append(html);
      }
    },
    error(result) {
      swal({
        title: 'Error!',
        text: `No se ha podido cargar las Categorias${result}`,
        icon: 'error',
      });
    },
  });
});
