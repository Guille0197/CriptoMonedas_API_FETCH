const cotizador = new API(
  "88717bb1c8fc83963baa608ed93a6d29d40b8affe8d64cda2522a00945f5a5b5"
);

const ui = new Interfaz();

// Leer el formulario
const formulario = document.querySelector("#formulario");

// Event Listeners
formulario.addEventListener("submit", (e) => {
  e.preventDefault();

  // leer la moneda seleccionada
  const monedaSelect = document.querySelector("#moneda");
  const monedaSeleccionada =
    monedaSelect.options[monedaSelect.selectedIndex].value;

  // leer la criptomoneda seleccionada
  const criptomonedaSelect = document.querySelector("#criptomoneda");
  const criptomonedaSeleccionada = criptomonedaSelect.options[criptomonedaSelect.selectedIndex].value;

  // Comprobar que ambos campos tengan algo seleccionado
  if (monedaSeleccionada === "" || criptomonedaSeleccionada === "") {
    // arrojar una alerta de error
    ui.mostrarMensaje("Ambos campos son obligatorios", "alert bg-danger text-center");
  } else {
    // todo bien, consultar la api
    cotizador.obtenerValores(monedaSeleccionada, criptomonedaSeleccionada)
      .then((data) => {
        ui.mostrarResultado(data.resultado.RAW, monedaSeleccionada, criptomonedaSeleccionada);
      });
  }
});
