const { StatusCodes } = require('http-status-codes');
const { response } = require('express');
const PDF = require('pdfkit-construct');
// const fs = require('fs');
const {
  consultarTablaNotaPedidos,
  elimniarProdDetalle,
  cargaNombre,
  cargaCabecera,
  cargaDetalle,
  consultarNotasPedido,
  modificarDetalleProducto,
  editarProdDetalle,
  mostrarCabeceraNota,
} = require('../querys/nota-querys');

const logger = require('../utils/logger');
const { toTitleCase } = require('../helpers/capitalize-word');
const { formatearFecha } = require('../helpers');

const obtenerTablaPedidos = async (req, res) => {
  try {
    const { idNota } = req.params;
    const pedidos = await consultarTablaNotaPedidos(idNota);
    res.status(StatusCodes.OK).send(JSON.stringify(pedidos[0]));
  } catch (error) {
    logger.error(`error en el controlador ${error}`);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ success: false, msg: error.message });
  }
};
const obtenerTablaProductosDetalle = async (req, res = response) => {
  try {
    const { fecha1, fecha2 } = req.params;

    const detalles = await consultarNotasPedido(fecha1, fecha2);
    res.status(StatusCodes.OK).send(JSON.stringify(detalles[0]));
  } catch (error) {
    logger.error(`error al obtener tabla Detalle ${error}`);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ success: false, msg: error.message });
  }
};

const eliminarProductoDetalle = async (req, res) => {
  try {
    const { idDetalle } = req.params;
    const idNota = await elimniarProdDetalle(idDetalle);
    const idRealNota = idNota.idNota;
    res.redirect(`/vistas/nota/editar/${idRealNota}`);
  } catch (error) {
    logger.error(
      `Ocurrió un error eliminar el producto en notacontrolador eliminar productodetalle: ${error}`,
    );
    throw error;
  }
};

const editarProductoDetalle = async (req, res) => {
  try {
    const { idDetaP, idNotaP, cant } = req.body;
    const productoModificado = await editarProdDetalle(idDetaP, idNotaP, cant);
    const idRealNota = productoModificado.idNotaPedido;
    res.redirect(`/vistas/nota/editar/${idRealNota}`);
  } catch (error) {
    logger.error(`Ocurrió un error en editarProductoDetalle notaControlador: ${error}`);
    throw error;
  }
};

const modificarProductoDetalle = async (req, res) => {
  try {
    const { idDetalle } = req.params;
    const productoEditar = await modificarDetalleProducto(idDetalle);
    res.status(StatusCodes.OK).send(JSON.stringify(productoEditar));
  } catch (error) {
    logger.error(
      `Ocurrió un error en notaControlador modificarproductodetalle: ${error}`,
    );
    throw error;
  }
};

const consultaNombreCliente = async (req, res = response) => {
  try {
    const nombre = req.body.term.term;

    const clientes = await cargaNombre(nombre);
    res.status(StatusCodes.OK).send(JSON.stringify(clientes));
  } catch (error) {
    logger.error(`error al obtener tabla Detalle ${error}`);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ success: false, msg: error.message });
  }
};

const registrarProductoDetalle = async (req, res = response) => {
  try {
    const { idCliente, legajo, cantidadVueltas } = req.body.cabeceraNota;

    const idNota = await cargaCabecera(idCliente, legajo);
    const detalle = [];
    for (let i = 1; i < cantidadVueltas; i += 1) {
      const { idProd, cantidad, precioUnitario } = req.body.cabeceraNota.Detalle[i];
      detalle.push(cargaDetalle(idNota, idProd, cantidad, precioUnitario));
    }
    const promiseDetalle = await Promise.all(detalle);
    return res.status(StatusCodes.OK).send(JSON.stringify(promiseDetalle));
  } catch (error) {
    logger.error(error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ success: false, msg: error });
  }
};

const obtenerTablaNota = async (req, res) => {
  try {
    const { fecha1, fecha2, estado } = req.params;
    const tablaNota = await consultarNotasPedido(fecha1, fecha2, estado);
    res.status(StatusCodes.OK).send(JSON.stringify(tablaNota));
  } catch (error) {
    logger.error(`error al obtener tabla Nota Productos nota controlador${error}`);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ success: false, msg: error.message });
  }
};

const generarPDF = async (req, res) => {
  try {
    const doc = new PDF({
      size: 'A4',
      margins: { top: 30, left: 45, right: 45, bottom: 30 },
      bufferPages: true,
    });
    const { id } = req.params;
    const filename = `NDP-${id}-${Date.now()}.pdf`;
    const stream = res.writeHead(200, {
      'Content-Type': 'application/pdf',
      'Content-disposition': `attachment;filename=${filename}`,
    });
    doc.on('data', (data) => {
      stream.write(data);
    });
    doc.on('end', () => {
      stream.end();
    });
    const cabecera = await mostrarCabeceraNota(id);
    const detalle = await consultarTablaNotaPedidos(id);

    let total = 0;
    const detalleTabla = detalle[0].map((element) => {
      const { Descripcion, Cantidad, PrecioUni, subTotal } = element;
      total += subTotal;
      return {
        Cantidad,
        Descripcion,
        PrecioUni: `$ ${PrecioUni.toFixed(2)}`,
        SubTotal: `$ ${subTotal.toFixed(2)}`,
      };
    });

    doc.setDocumentHeader(
      {
        height: '20%',
      },
      () => {
        doc
          .lineJoin('miter')
          .rect(0, 0, doc.page.width, doc.header.options.heightNumber)
          .fill('#ededed');

        doc
          .fill('#000000')
          .fontSize(20)
          .text('SUPER MAMI - AREA VENTAS', {
            width: doc.page.width - doc.page.margins.right,
            align: 'center',
            lineBreak: false,
          });
        doc.fontSize(12);
        doc.text(`     `, doc.header.x, null, {
          width: 420,
          align: 'left',
        });
        doc.text(`${formatearFecha(new Date(cabecera.Fecha))}`, doc.header.x, null, {
          width: 420,
          align: 'left',
        });
        doc.text(`     `, doc.header.x, null, {
          width: 420,
          align: 'left',
        });
        doc.text(`NOTA DE PEDIDO #${id}`, doc.header.x, null, {
          width: 420,
          align: 'left',
        });
        doc.text(cabecera.EstadoNP, {
          width: 420,
          align: 'left',
        });
        doc.text(`Direccion: ${cabecera.direccionCliente}`, {
          width: 420,
          align: 'left',
        });
        doc.text(`Cliente: ${toTitleCase(cabecera.Cliente)}`, {
          width: 420,
          align: 'left',
        });
      },
    );

    doc.addTable(
      [
        { key: 'Cantidad', label: 'Cantidad', align: 'left' },
        { key: 'Descripcion', label: 'Descripcion', align: 'left' },
        { key: 'PrecioUni', label: 'Precio Uni.', align: 'left' },
        { key: 'SubTotal', label: 'Subtotal', align: 'left' },
      ],
      detalleTabla,
      {
        border: null,
        width: 'fill_body',
        striped: true,
        stripedColors: ['#f6f6f6', '#d6c4dd'],
        cellsPadding: 10,
        headAlign: 'left',
      },
    );

    doc.addTable(
      [{ key: 'total', label: 'Total', align: 'right' }],
      [{ total: `$ ${total.toFixed(2)}` }],
      {
        border: null,
        width: 'fill_body',
        striped: true,
        cellsPadding: 10,
        headAlign: 'right',
      },
    );
    doc.render();

    doc.end();
  } catch (error) {
    logger.error(error);
    throw error;
  }
};

module.exports = {
  obtenerTablaPedidos,
  registrarProductoDetalle,
  obtenerTablaProductosDetalle,
  eliminarProductoDetalle,
  consultaNombreCliente,
  obtenerTablaNota,
  modificarProductoDetalle,
  editarProductoDetalle,
  generarPDF,
};
