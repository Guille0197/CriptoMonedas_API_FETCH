class Interfaz {
  constructor() {
    this.init();
  }
  init() {
    this.construirSelect();
    this.baseImgUrl;
  }

  construirSelect() {
    cotizador.obtenerMonedasAPI().then((monedas) => {

      // cargar la imagen de la criptomoneda
      this.baseImgUrl = monedas.monedas.BaseImageUrl;

      // crear un select de opciones
      const select = document.querySelector("#criptomoneda");

      // iterrar por los resultados de la api
      for (const [key, value] of Object.entries(monedas.monedas.Data)) {
        // agregar el Symbol y el nombre como opciones
        const opcion = document.createElement("option");
        opcion.value = value.Symbol;
        opcion.appendChild(document.createTextNode(value.CoinName));
        select.appendChild(opcion);
      }
    });
  }

  mostrarMensaje(mensaje, clases) {
    const div = document.createElement("div");
    div.className = clases;
    div.appendChild(document.createTextNode(mensaje));

    // seleccionar mensajes
    const divMensaje = document.querySelector(".mensajes");
    divMensaje.appendChild(div);

    // mostrar contenido
    setTimeout(() => {
      document.querySelector(".mensajes div").remove();
    }, 3000);
  }

  // Imprime el resultado de la cotizacion
  mostrarResultado(resultado, moneda, crypto) {

    // En caso de un resultado anterior, ocultarlo
    const resultadoAnterior = document.querySelector('#resultado > div');
    if (resultadoAnterior) {
      resultadoAnterior.remove();
    }

    const datosMoneda = resultado[crypto][moneda];

    //console.log(datosMoneda);

    // recortar digitos de precio, porcentaje y fecha
    let precio = datosMoneda.PRICE.toFixed(2),
      porcentaje = datosMoneda.CHANGEPCTDAY.toFixed(2),
      actualizado = new Date(datosMoneda.LASTUPDATE * 1000).toLocaleDateString('es-PA');

    // construir template
    let templateHTML = `
      <div class="card bg-warning">
        <div class="card-body text-light">
        <img src="${ui.baseImgUrl + datosMoneda.IMAGEURL}"  width="100" height="100">
          <h2 class="card-title">Resultado:</h2>
          <p>El Precio de ${datosMoneda.FROMSYMBOL} a moneda ${datosMoneda.TOSYMBOL} es de:
            $${precio}
          </p>
          <p>Variación último día: %${porcentaje}</p>
          <p>Última actualización: ${actualizado}</p>
        </div>
      </div>
    `;

    this.mostrarOcultarSpinner('block');

    setTimeout(() => {
      // insertar el resultado
      document.querySelector('#resultado').innerHTML = templateHTML;
      this.mostrarOcultarSpinner('none');
    }, 3000);
  }

  // Mostrar o ocultar un spinner de carga al enviar la cotizacion
  mostrarOcultarSpinner(vista) {
    const spinner = document.querySelector('.contenido-spinner');
    spinner.style.display = vista;
  }
}
