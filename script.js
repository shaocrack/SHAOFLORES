window.onload = init;
var petalos;
var boton_jugar;
var valores;
var petalosFaltantes;
var mensajeFinal;
var mensaje;
var texto_mensaje;
var botonNuevo;

function init() {
  petalos = document.getElementsByClassName("petalo");
  asignarEvento();
  boton_jugar = document.getElementById("botonJugar");
  boton_jugar.addEventListener("click", abrirJuego);
  mensaje = document.getElementById("mensaje");
  texto_mensaje = document.getElementById("texto_mensaje");
  botonNuevo = document.getElementById("botonNuevo");
  botonNuevo.addEventListener("click", reiniciarPetalos);
  botonNuevo.style.display = "none"; // Inicialmente ocultar el nuevo botón
}

function asignarValores() {
  var numero_aleatorio = Math.round(Math.random() * 10);
  var moneda = numero_aleatorio > 5;
  valores = [];
  petalosFaltantes = petalos.length;
  for (var i = 0; i < petalos.length; i++) {
    valores[i] = moneda;
    moneda = !moneda;
  }
  mensajeFinal = "";
}

function abrirJuego() {
  var ventana_actual = document.getElementById("intro");
  var ventana_juego = document.getElementById("juego");
  ventana_actual.className = "hidden";
  ventana_juego.className = "animated fadeIn";
  asignarValores();
  mostrarSiguientePetalo();
}

function asignarEvento() {
  for (var i = 0; i < petalos.length; i++) {
    petalos[i].addEventListener("click", animar);
  }
}

function colorAleatorio() {
  var r = Math.round(Math.random() * 255);
  var g = Math.round(Math.random() * 255);
  var b = Math.round(Math.random() * 255);
  return "rgb(" + r + "," + g + "," + b + ")";
}

function animar(event) {
  var id_petalo = event.target.id;
  var petalo = document.getElementById("" + id_petalo);
  petalo.style.display = "none";
  petalo.className = "petalo animated fadeOutDown";
  validarJugada(id_petalo);
}

function validarJugada(petalo) {
  var indice = parseInt(petalo.substr(1));
  var str;

  if (valores[indice - 1]) {
    str = "Me quiere";
  } else {
    str = "No me quiere";
  }

  petalosFaltantes--;

  texto_mensaje.innerHTML = str;
  mensaje.className = "mostrar animated fadeIn";

  if (petalosFaltantes === 0) {
    if (str === "Me quiere") {
      mensajeFinal = "Es hora de dormir,te deseo una bonita noche"
      mostrarBotonNuevo();
    } else {
      mensajeFinal = "Sigue participando :C , tu puedes hermosa";
      reiniciarPetalos();
    }

    setTimeout(() => {
      mensaje.innerHTML = mensajeFinal;
      mensaje.className = "mostrar animated fadeIn";
    }, 1000);
  } else {
    setTimeout(() => {
      mensaje.className = "hidden";
    }, 1000);
  }
}

function mostrarSiguientePetalo() {
  if (petalosFaltantes < petalos.length) {
    petalos[petalos.length - petalosFaltantes].style.display = "block";
    petalos[petalos.length - petalosFaltantes].className = "petalo";
  }
}

function mostrarBotonNuevo() {
  // Mostrar el botón
  botonNuevo.style.display = "block";

  // Agregar un evento clic al botón
  botonNuevo.addEventListener("click", function() {
    // Mostrar la alerta
    alert("¡Recuerda que ERES GENIAL y todo lo puedes lograr! Y MAÑANA ENSEÑALE AL SOL COMO BRILLAR C:");

    // Abrir el enlace de YouTube
    window.open("https://youtu.be/qZDt8dEzhIM?list=RDadCXBpaNxGs&t=41", "_blank");
  });
}

function reiniciarPetalos() {
  setTimeout(function () {
    location.reload();
  }, 3000);
}
