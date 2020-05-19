let nav = document.querySelector("nav");
let a = document.querySelector("a");

AOS.init({
    once: true, // whether animation should happen only once - while scrolling down
    mirror: true, // whether elements should animate out while scrolling past them
});
const typed = new Typed(".typed", {
    strings: [""],
    stringsElement: "#cadenas-texto", // ID del elemento que contiene cadenas de texto a mostrar.
    typeSpeed: 75, // Velocidad en mlisegundos para poner una letra,
    startDelay: 300, // Tiempo de retraso en iniciar la animacion. Aplica tambien cuando termina y vuelve a iniciar,
    backSpeed: 75, // Velocidad en milisegundos para borrrar una letra,
    smartBackspace: true, // Eliminar solamente las palabras que sean nuevas en una cadena de texto.
    shuffle: false, // Alterar el orden en el que escribe las palabras.
    backDelay: 1500, // Tiempo de espera despues de que termina de escribir una palabra.
    loop: true, // Repetir el array de strings
    //loopCount: false, Cantidad de veces a repetir el array.  false = infinite
    showCursor: true, // Mostrar cursor palpitanto
    cursorChar: "|", // Caracter para el cursor
    contentType: "html", // 'html' o 'null' para texto sin formato
});

/*Navbar*/
$('.links').click(function() {
    var destino = $(this.hash);
    if (destino.length == 0) {
        destino = $('a[name="' + this.hash.substr(1) + '"]');
    }
    if (destino.length == 0) {
        destino = $('nav');
    }

    $('html, body').animate({
        scrollTop: destino.offset().top
    }, 1000, function() {
        $('.navbar-collapse').removeClass('show');

    });
    return false;
});
window.onscroll = function() {
    // console.log("Vertical: " + window.scrollY);
    if (window.scrollY > 56) {
        nav.classList.add("bg-secondary");
        a.classList.add("text-white");
        nav.classList.remove("bg-transparent");
    } else {
        nav.classList.add("bg-transparent");
        nav.classList.remove("bg-secondary");
        a.classList.remove("text-dark");
        a.classList.add("text-white");
    }
};



/*proyectos*/
document.getElementById("githubI").onclick = function() {
    window.open("https://github.com/JoelGuerrero03/Inovix");
};
document.getElementById("inovix").onclick = function() {
    window.open("https://inovix.herokuapp.com/");
};
document.getElementById("people").onclick = function() {
    window.open("http://peopleinmotion.000webhostapp.com/index.html");
};

/*formulario*/
$('#celular').keypress(function(tecla) {
    if (tecla.charCode < 48 || tecla.charCode > 57) return false;
});
$("#nombre").on("keypress", function(tecla) {
    if ((tecla.charCode < 97 || tecla.charCode > 122) && (tecla.charCode < 65 || tecla.charCode > 90) && (tecla.charCode != 45) && (tecla.charCode != 32) && (tecla.charCode != 46) && (tecla.charCode != 209) && (tecla.charCode != 225) && (tecla.charCode != 241)) return false;
});
$("#asunto").on("keypress", function(tecla) {
    if ((tecla.charCode < 97 || tecla.charCode > 122) && (tecla.charCode < 65 || tecla.charCode > 90) && (tecla.charCode != 45) && (tecla.charCode != 32) && (tecla.charCode != 46) && (tecla.charCode != 209) && (tecla.charCode != 225) && (tecla.charCode != 241)) return false;
});
$("#correo").on("keypress", function(tecla) {
    if ((tecla.charCode < 97 || tecla.charCode > 122) && (tecla.charCode < 65 || tecla.charCode > 90) && (tecla.charCode != 45) && (tecla.charCode != 32) && (tecla.charCode != 46) && (tecla.charCode != 209) && (tecla.charCode != 225) && (tecla.charCode != 241) && (tecla.charCode < 48 || tecla.charCode > 57) && (tecla.charCode != 33) && (tecla.charCode != 64) && (tecla.charCode != 35) && (tecla.charCode != 36) && (tecla.charCode != 38) && (tecla.charCode != 42) && (tecla.charCode != 95) && (tecla.charCode != 46)) return false;
    console.log(tecla.charCode);
});
$("#mensaje").on("keypress", function(tecla) {
    if ((tecla.charCode < 97 || tecla.charCode > 122) && (tecla.charCode < 65 || tecla.charCode > 90) && (tecla.charCode != 95) && (tecla.charCode != 36) && (tecla.charCode != 35) && (tecla.charCode != 42) && (tecla.charCode != 37) && (tecla.charCode != 64) && (tecla.charCode != 45) && (tecla.charCode != 32) && (tecla.charCode != 46) && (tecla.charCode != 58) && (tecla.charCode != 39) && (tecla.charCode != 61) && (tecla.charCode != 45) && (tecla.charCode != 209) && (tecla.charCode != 225) && (tecla.charCode != 241) && (tecla.charCode != 44) && (tecla.charCode != 59) && (tecla.charCode != 33) && (tecla.charCode != 40) && (tecla.charCode != 41) && (tecla.charCode != 34) && (tecla.charCode < 48 || tecla.charCode > 57)) return false;
    console.log(tecla.charCode);
});
document.getElementById("enviarBTN").addEventListener("click", function() {
    var nombre = document.getElementById("nombre").value;
    var celular = document.getElementById("celular").value;
    var asunto = document.getElementById("asunto").value;
    var correo = document.getElementById("correo").value;
    var mensaje = document.getElementById("mensaje").value;

    if (
        nombre != "" &&
        celular != "" &&
        asunto != "" &&
        correo != "" &&
        mensaje != ""
    ) {
        var datos = {
            n: nombre,
            ce: celular,
            a: asunto,
            co: correo,
            m: mensaje,
        };
        axios
            .post("/api/contacto", datos)
            .then(function(res) {
                console.log(res);
                document.getElementById("nombre").value = "";
                document.getElementById("celular").value = "";
                document.getElementById("asunto").value = "";
                document.getElementById("correo").value = "";
                document.getElementById("mensaje").value = "";
                Swal.fire(
                    "Good job!",
                    "Gracias por escribirnos, en breve te contactaremos",
                    "success"
                );
            })
            .catch(function(err) {
                console.log(err);
            });
    } else {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Por favor rellenar todos los campos",
        });
    }

});


/* Preloader */
window.addEventListener('load', () => {
    const contenedor_loader = document.querySelector('.contenedor_loader');
    contenedor_loader.style.opacity = 0;
    contenedor_loader.style.visibility = 'hidden';
});