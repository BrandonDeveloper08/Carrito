// Variables
const carrito = document.querySelector("#carrito");
contenedorCarrito = document.querySelector("#lista-carrito tbody");
vaciarCarrito = document.querySelector("#vaciar-carrito");
listaCursos = document.querySelector("#lista-cursos");

let articulos = [];

registrarEventListeners();
function registrarEventListeners() {
    listaCursos.addEventListener("click", agregarCurso);

    carrito.addEventListener("click", eliminarCurso)

    vaciarCarrito.addEventListener("click", () => {
        articulos = [];
        localStorage.removeItem("cursos")
        limpiarHTML();
    })

    // Recuperar Datos de los cursos 
    document.addEventListener("DOMContentLoaded", e => {
        articulos = JSON.parse(localStorage.getItem("cursos")) || []
        carritoHTML()
    })
}


// Funciones
function eliminarCurso(e) {
    e.preventDefault();

    if (e.target.classList.contains("borrar-curso")) {
        const cursoId = e.target.getAttribute("data-id");
        articulos = articulos.filter(curso => curso.id !== cursoId);
        carritoHTML();
    }
}

function agregarCurso(e) {
    e.preventDefault();
    if (e.target.classList.contains("agregar-carrito")) {
        const cursoSeleccionado = e.target.parentElement.parentElement
        leerDatosCurso(cursoSeleccionado);
    }
}

function leerDatosCurso(curso) {
    const infoCurso = {
        img: curso.querySelector("img").src,
        titulo: curso.querySelector("h4").textContent,
        precio: curso.querySelector(".precio span").textContent,
        id: curso.querySelector("a").getAttribute("data-id"),
        cantidad: 1
    }

    const existe = articulos.some(curso => curso.id == infoCurso.id);

    if (existe) {

        const cursos = articulos.map(curso => {
            if (curso.id == infoCurso.id) {
                curso.cantidad++;
                return curso;
            } else {
                return curso;
            }
        })

        articulos = [...cursos]
    } else {
        articulos = [...articulos, infoCurso]
    }

    carritoHTML();
}
function carritoHTML() {
    limpiarHTML();
    articulos.forEach(curso => {
        const { img, titulo, precio, cantidad, id } = curso;
        const row = document.createElement("tr");
        row.innerHTML = `
            <td><img src="${img}" width='100'></td>
            <td>${titulo}</td>
            <td>${precio}</td>
            <td>${cantidad}</td>
            <td><a href="#" class="borrar-curso" data-id=${id}>X</a></td>
        `
        contenedorCarrito.appendChild(row)
    })

    // Agregar carrito de compras al Storage
    sincronizarStorage()
}

function sincronizarStorage() {
    localStorage.setItem("cursos", JSON.stringify(articulos))
}

function limpiarHTML() {
    while (contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}