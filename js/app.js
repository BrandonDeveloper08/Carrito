// Variables
const carrito = document.querySelector("#carrito");
const contenedorCarrito = document.querySelector("#lista-carrito tbody");
const vaciarCarrito = document.querySelector("#vaciar-carrito")
const listaCursos = document.querySelector("#lista-cursos");
let articulosCarrito = [];


registrarEvenListener();
function registrarEvenListener(){
    listaCursos.addEventListener("click",agregarCurso);

    // Elimina cursos del carrito
    carrito.addEventListener("click", eliminarCurso);

    // Vaciar el Carrito
    vaciarCarrito.addEventListener("click", ()=>{
        articulosCarrito = [] // Reseteamos el HTML
        
        limpiarHTML(); // Eliminamos todo el HTML
    })
}

//Eliminar curso del carrito
function eliminarCurso(e){
    e.preventDefault();
    if(e.target.classList.contains("borrar-curso")){
        const cursoId = e.target.getAttribute("data-id");
        //Elimina del arreglo de articulosCarrito por el data-id
        articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId)

        carritoHTML(); // Iterar sobre el carrito y volvemos a mostrar
    };
}

//Funciones
function agregarCurso(e){
    e.preventDefault();
    
    if(e.target.classList.contains("agregar-carrito")){
        const cursoSeleccionado = e.target.parentElement.parentElement
        leerDatosCurso(cursoSeleccionado);
    }
}

// Lee el contenido del HTML y extrae la informacion
function leerDatosCurso(curso){

    //Crear un objeto con el contenido del curso
    const infoCurso ={
        imagen: curso.querySelector("img").src,
        titulo: curso.querySelector("h4").textContent,
        precio: curso.querySelector(".precio span").textContent,
        id: curso.querySelector("a").getAttribute("data-id"),
        cantidad: 1
    }

    // Revisa si un elemento ya existe en el carrito
    const existe = articulosCarrito.some(curso => curso.id === infoCurso.id );
    if(existe){
        const cursos = articulosCarrito.map( curso =>{
            if(curso.id === infoCurso.id ){
                curso.cantidad++;
                return curso; //Retorna el obj actualizado
            }else{
                return curso; //Retorna los objetos que no son duplicados
            }
        })
        articulosCarrito = [...cursos];
    }else{
        articulosCarrito = [...articulosCarrito, infoCurso];
    }

    // Agregar elementos al arreglo de carrito

    console.log(articulosCarrito);
    
    carritoHTML();
}


// Muestra el Carrito de compras en el HTML
function carritoHTML(){

    // Limpiar el HTML
    limpiarHTML();

    // Recorre el carrito y genera el HTML
    articulosCarrito.forEach( curso =>{
        const {imagen, titulo, precio, cantidad, id} = curso;
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>
                <img src="${imagen}" width="100">
            </td>
            <td>${titulo}</td>
            <td>${precio}</td>
            <td>${cantidad}</td>
            <td>
                <a href="#" class="borrar-curso" data-id=${curso.id}>X</a>
            </td>
        `;

        // Agrega el HTML del carrito en el tbody
        contenedorCarrito.appendChild(row);        
    })
}


function limpiarHTML(){
    //Forma lenta
    // contenedorCarrito.innerHTML = ""

    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }
}