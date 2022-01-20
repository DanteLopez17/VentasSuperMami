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
