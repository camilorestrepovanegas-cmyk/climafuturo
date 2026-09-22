"use strict";

document.addEventListener("DOMContentLoaded", iniciarAplicacion);

function iniciarAplicacion() {
  const filtroLluvia = document.querySelector("#filtro-lluvia");

  if (!filtroLluvia) {
    return;
  }

  filtroLluvia.addEventListener("change", filtrarPronosticos);
  filtrarPronosticos({ target: filtroLluvia });
}

function filtrarPronosticos(evento) {
  const opcionSeleccionada = evento.target.value;
  const tarjetas = document.querySelectorAll(".forecast-card");
  const textoResultado = document.querySelector("#resultado-filtro");
  const mensajeVacio = document.querySelector("#sin-resultados");
  let cantidadVisible = 0;

  tarjetas.forEach(function (tarjeta) {
    const probabilidadLluvia = Number(tarjeta.dataset.lluvia);
    const mostrarTarjeta = debeMostrarTarjeta(
      opcionSeleccionada,
      probabilidadLluvia
    );

    tarjeta.classList.toggle("forecast-card--hidden", !mostrarTarjeta);
    tarjeta.setAttribute("aria-hidden", String(!mostrarTarjeta));

    if (mostrarTarjeta) {
      cantidadVisible += 1;
    }
  });

  actualizarResultado(
    opcionSeleccionada,
    cantidadVisible,
    textoResultado,
    mensajeVacio
  );
}

function debeMostrarTarjeta(opcion, probabilidad) {
  if (opcion === "alta") {
    return probabilidad >= 50;
  }

  if (opcion === "baja") {
    return probabilidad < 50;
  }

  return true;
}

function actualizarResultado(opcion, cantidad, texto, mensajeVacio) {
  const mensajes = {
    todos: "Se muestran todos los días disponibles.",
    alta: "Se muestran los días con probabilidad de lluvia del 50 % o más.",
    baja: "Se muestran los días con probabilidad de lluvia menor al 50 %."
  };

  if (texto) {
    texto.textContent =
      mensajes[opcion] + " Resultados encontrados: " + cantidad + ".";
  }

  if (mensajeVacio) {
    mensajeVacio.hidden = cantidad !== 0;
  }
}
