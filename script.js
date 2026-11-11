
/* ==========================================
   PÁGINA WEB DE ANIVERSARIO
   JAVASCRIPT - FUNCIONES INTERACTIVAS
========================================== */

document.addEventListener("DOMContentLoaded", () => {

  /* ========================================
     1. CONFIGURACIÓN DE FECHA
  ======================================== */

  // CAMBIA ESTA FECHA POR TU ANIVERSARIO
  // Formato: AÑO-MES-DÍA

  const FECHA_ANIVERSARIO = "2008-10-13T00:00:00";

  const fechaInicio = new Date(FECHA_ANIVERSARIO);

  /* ========================================
     2. SELECCIONAR ELEMENTOS HTML
  ======================================== */

  const introScreen = document.getElementById("introScreen");
  const unlockButton = document.getElementById("unlockButton");
  const introStatus = document.getElementById("introStatus");
  const experience = document.getElementById("experience");

  const daysElement = document.getElementById("days");
  const hoursElement = document.getElementById("hours");
  const minutesElement = document.getElementById("minutes");
  const secondsElement = document.getElementById("seconds");

  const anniversaryDate = document.getElementById("anniversaryDate");

  const envelopeButton = document.getElementById("envelopeButton");
  const letterModal = document.getElementById("letterModal");
  const closeLetter = document.getElementById("closeLetter");

  const heartsLayer = document.getElementById("heartsLayer");

  const promiseCards = document.querySelectorAll(".promise-card");

  /* ========================================
     3. ANIMACIÓN DE HUELLA DIGITAL
  ======================================== */

  let desbloqueando = false;

  unlockButton.addEventListener("click", () => {

    // Evitar que se active varias veces
    if (desbloqueando) return;

    desbloqueando = true;

    // Activar brillo de la huella
    introScreen.classList.add("unlocking");

    introStatus.textContent = "Desbloqueando nuestra historia... ♡";

    unlockButton.disabled = true;

    // Esperar a que termine la animación
    setTimeout(() => {

      // Ocultar pantalla inicial
      introScreen.hidden = true;

      // Mostrar página de aniversario
      experience.hidden = false;

      // Regresar al inicio de la página
      window.scrollTo({
        top: 0,
        behavior: "instant"
      });

      // Actualizar contador
      actualizarContador();

    }, 1200);

  });

  /* ========================================
     4. CONTADOR DE DÍAS, HORAS,
        MINUTOS Y SEGUNDOS
  ======================================== */

  function actualizarContador() {

    const fechaActual = new Date();

    // Diferencia entre fechas en milisegundos
    let diferencia = fechaActual.getTime() - fechaInicio.getTime();

    // Evitar números negativos
    if (diferencia < 0) {
      diferencia = 0;
    }

    // Convertir tiempo
    const segundosTotales = Math.floor(diferencia / 1000);

    const dias = Math.floor(segundosTotales / 86400);

    const horas = Math.floor(
      (segundosTotales % 86400) / 3600
    );

    const minutos = Math.floor(
      (segundosTotales % 3600) / 60
    );

    const segundos = segundosTotales % 60;

    // Mostrar números en HTML
    daysElement.textContent = dias;

    hoursElement.textContent =
      String(horas).padStart(2, "0");

    minutesElement.textContent =
      String(minutos).padStart(2, "0");

    secondsElement.textContent =
      String(segundos).padStart(2, "0");
  }

  // Actualizar cada segundo
  actualizarContador();

  setInterval(actualizarContador, 1000);

  /* ========================================
     5. MOSTRAR FECHA DE ANIVERSARIO
  ======================================== */

  const fechaFormateada = fechaInicio.toLocaleDateString(
    "es-PE",
    {
      day: "numeric",
      month: "long",
      year: "numeric"
    }
  );

  anniversaryDate.textContent =
    "DESDE EL " + fechaFormateada.toUpperCase();

  /* ========================================
     6. ABRIR SOBRE ANIMADO
  ======================================== */

  let cartaAbriendose = false;
  let temporizadorCarta = null;

  envelopeButton.addEventListener("click", () => {

    if (cartaAbriendose) return;

    cartaAbriendose = true;

    // Animar sobre
    envelopeButton.classList.add("is-open");

    // Esperar la apertura antes de mostrar la carta
    temporizadorCarta = setTimeout(() => {

      abrirCarta();

      cartaAbriendose = false;
      temporizadorCarta = null;

    }, 850);

  });

  /* ========================================
     7. MOSTRAR CARTA SORPRESA
  ======================================== */

  function abrirCarta() {

    // Mostrar ventana de la carta
    letterModal.hidden = false;

    // Bloquear desplazamiento del fondo
    document.body.classList.add("modal-open");

    // Enfocar la carta
    const papel = letterModal.querySelector(".letter-paper");

    if (papel) {
      papel.focus();
    }

  }

  /* ========================================
     8. CERRAR CARTA
  ======================================== */

  function cerrarCarta() {

    // Cancelar apertura pendiente, si existe
    if (temporizadorCarta !== null) {
      clearTimeout(temporizadorCarta);
      temporizadorCarta = null;
    }

    // Ocultar carta
    letterModal.hidden = true;

    // Permitir desplazamiento
    document.body.classList.remove("modal-open");

    // Cerrar sobre
    envelopeButton.classList.remove("is-open");

    cartaAbriendose = false;

    // Volver a enfocar el sobre
    envelopeButton.focus();

  }

  // Botón X
  closeLetter.addEventListener("click", cerrarCarta);

  // Cerrar al tocar fuera de la carta
  const fondoCarta = letterModal.querySelector(
    '[data-close="letter"]'
  );

  fondoCarta.addEventListener("click", cerrarCarta);

  // Cerrar con tecla ESC
  document.addEventListener("keydown", (evento) => {

    if (letterModal.hidden) return;

    if (evento.key === "Escape") {
      cerrarCarta();
    }

    // Mantener navegación de teclado dentro de la carta
    if (evento.key === "Tab") {
      evento.preventDefault();
      closeLetter.focus();
    }

  });

  /* ========================================
     9. TARJETAS SORPRESA QUE GIRAN
  ======================================== */

  promiseCards.forEach((tarjeta) => {

    tarjeta.addEventListener("click", () => {

      // Girar o regresar la tarjeta
      tarjeta.classList.toggle("is-revealed");

      const estaAbierta =
        tarjeta.classList.contains("is-revealed");

      // Actualizar atributos accesibles
      tarjeta.setAttribute(
        "aria-expanded",
        String(estaAbierta)
      );

      const frente = tarjeta.querySelector(".promise-front");
      const reverso = tarjeta.querySelector(".promise-back");

      frente.setAttribute(
        "aria-hidden",
        String(estaAbierta)
      );

      reverso.setAttribute(
        "aria-hidden",
        String(!estaAbierta)
      );

    });

  });

  /* ========================================
     10. CREAR CORAZONES FLOTANTES
  ======================================== */

  function crearCorazones() {

    const cantidadCorazones = 25;

    const simbolos = ["♥", "♡", "❤", "✦"];

    const colores = [
      "#ff7eb6",
      "#ffd6e8",
      "#f4d990",
      "#e7a8ff",
      "#ffb4c8"
    ];

    for (let i = 0; i < cantidadCorazones; i++) {

      // Crear elemento
      const corazon = document.createElement("span");

      corazon.classList.add("floating-heart");

      // Elegir símbolo aleatorio
      const simboloAleatorio = Math.floor(
        Math.random() * simbolos.length
      );

      corazon.textContent = simbolos[simboloAleatorio];

      // Posición horizontal
      const posicion = Math.random() * 100;

      // Tamaño aleatorio
      const tamaño = 10 + Math.random() * 18;

      // Duración de animación
      const duracion = 9 + Math.random() * 12;

      // Retraso aleatorio
      const retraso = Math.random() * -20;

      // Movimiento hacia los lados
      const movimiento = (Math.random() - 0.5) * 180;

      // Elegir color
      const color = colores[
        Math.floor(Math.random() * colores.length)
      ];

      // Enviar valores al CSS
      corazon.style.setProperty(
        "--left",
        posicion + "%"
      );

      corazon.style.setProperty(
        "--size",
        tamaño + "px"
      );

      corazon.style.setProperty(
        "--duration",
        duracion + "s"
      );

      corazon.style.setProperty(
        "--delay",
        retraso + "s"
      );

      corazon.style.setProperty(
        "--sway",
        movimiento + "px"
      );

      corazon.style.setProperty(
        "--heart-color",
        color
      );

      // Agregar corazón a la página
      heartsLayer.appendChild(corazon);

    }

  }

  /* ========================================
     11. INICIAR ANIMACIONES
  ======================================== */

  crearCorazones();

  console.log("Página de cumpleaños cargada correctamente ♡");

});
