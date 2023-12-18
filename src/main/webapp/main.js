// class Orador{
//     constructor(id, nombre, imagen, descripcion){
//         this.id = id;
//         this.nombre = nombre;
//         this.imagen = imagen;
//         this.descripcion = descripcion;
//         this.listaTopicos = [];
//     }

//     descripcionOrador(){
//         return `
//         <div data-aos="fade-up" data-aos-duration="1600" data-aos-delay="0">
//             <div class="card">
//                 <img src="${this.imagen}" class="card-img-top img-fluid" alt="${this.nombre}">
//                 <div class="card-body">
//                     <div class="d-flex align-items-end gap-1">
//                         <p class="card-item bg-yellow">${this.listaTopicos}</p>
//                         <p class="card-item bg-green">${this.listaTopicos}</p>
//                     </div>
//                     <h5 class="card-title">${this.nombre}</h5>
//                     <p class="card-text">${this.descripcion}</p>
//                 </div>
//             </div>
//         </div>`
//     }
// }

// class OradorController{
//     constructor(){
//         this.listaOradores = [];
//     }

//     agregar(orador){
//         if (orador instanceof Orador) {
//             this.listaOradores.push(orador);
//         }
//     }

//     cargarDatos(){
//         fetch('oradores.json')
//             .then(response => response.json())
//             .then(response => {
//                 response.forEach(orador => {
//                     let nuevoOrador = new Orador(...Object.values(orador));
//                     this.agregar(nuevoOrador);
//                 });
//                 this.cargarOradores();
//             })
//         .catch(error => console.error('Error al cargar oradores', error));
//     }

//     cargarOradores(){
//         const oradoresContainer = document.getElementById("oradores-container");
//         oradoresContainer.innerHTML = "";

//         if(this.listaOradores.length === 0){
//             oradoresContainer.innerHTML = '<div class="d-flex justify-content-center w-100 pt-4"><h4 class="filter-error p-3">No se han registrado oradores para la próxima conferencia</h4></div>';
//         }
//         else{
//             this.listaOradores.forEach( orador => {
//                 oradoresContainer.innerHTML += orador.descripcionOrador();
//             });
//         }
//     }
// }

class Compra{
    constructor(){
        this.valorTicket = 200;
        this.cantidadTickets = this.cantidadTickets;
        this.nombre = this.nombre;
        this.apellido = this.apellido;
        this.correo = this.correo;
        this.categoriaSeleccionada = this.categoriaSeleccionada;
        this.total = this.total;
    }

    guardarEnStorage(){
        const datosCompra = {
            cantidadTickets: this.cantidadTickets,
            nombre: this.nombre,
            apellido: this.apellido,
            correo: this.correo,
            categoriaSeleccionada: this.categoriaSeleccionada,
            total: this.total,
        };
        localStorage.setItem("datosCompra", JSON.stringify(datosCompra));
    }

    recuperarStorage(){
        let datosCompra = JSON.parse(localStorage.getItem("datosCompra"));
        if (datosCompra) {
            this.cantidadTickets = datosCompra.cantidadTickets;
            this.nombre = datosCompra.nombre;
            this.apellido = datosCompra.apellido;
            this.correo = datosCompra.correo;
            this.categoriaSeleccionada = datosCompra.categoriaSeleccionada;
            this.total = datosCompra.total;

            document.getElementById("cantidad-tickets").value = this.cantidadTickets;
            document.getElementById("nombre").value = this.nombre;
            document.getElementById("apellido").value = this.apellido;
            document.getElementById("correo").value = this.correo;
            document.getElementById("categoria-seleccionada").value = this.categoriaSeleccionada;
            document.getElementById("total-compra").innerHTML = `$ ${this.total}`;
        }
    }

    calcularTotal(){
        this.total = this.valorTicket * this.cantidadTickets;
        if(this.categoriaSeleccionada == "Estudiante"){
            this.total = this.total - (this.total * 80 / 100);
        }
        else if(this.categoriaSeleccionada == "Trainee"){
            this.total = this.total - (this.total * 50 / 100);
        }
        else if(this.categoriaSeleccionada == "Junior"){
            this.total = this.total - (this.total * 15 / 100);
        }
        return this.total;
    }

    cargarDatosCompra(){
        this.cantidadTickets = document.getElementById("cantidad-tickets").value;
        this.nombre = document.getElementById("nombre").value;
        this.apellido = document.getElementById("apellido").value;
        this.correo = document.getElementById("correo").value;
        this.categoriaSeleccionada = document.getElementById("categoria-seleccionada").value;
        this.total = this.calcularTotal();
    }

    limpiarDatosCompra(){
        this.cantidadTickets = "";
        this.nombre = "";
        this.apellido = "";
        this.correo = "";
        this.categoriaSeleccionada = "";
        this.total = "";

        document.getElementById("cantidad-tickets").value = this.cantidadTickets;
        document.getElementById("nombre").value = this.nombre;
        document.getElementById("apellido").value = this.apellido;
        document.getElementById("correo").value = this.correo;
        document.getElementById("categoria-seleccionada").value = this.categoriaSeleccionada;
        document.getElementById("total-compra").innerHTML = `${this.total}`;
    }

    validarCampos() {
        const nombre = document.getElementById("nombre").value;
        const apellido = document.getElementById("apellido").value;
        const correo = document.getElementById("correo").value;
        const cantidadTickets = document.getElementById("cantidad-tickets").value;
        const categoriaSeleccionada = document.getElementById("categoria-seleccionada").value;
        return nombre && apellido && correo && cantidadTickets && categoriaSeleccionada;
    }

    cargarBotonesEnDom(){
        const btnResumen = document.getElementById("btn-resumen");
        btnResumen.addEventListener("click", () => {
            if (this.validarCampos()) {
                this.cargarDatosCompra();
                this.guardarEnStorage();
                const totalCompra = document.getElementById("total-compra");
                totalCompra.innerHTML = `$${this.total}`;
            } else {
                alert("Por favor, complete todos los campos requeridos.");
            }
        });
        const btnBorrar = document.getElementById("btn-borrar");
        btnBorrar.addEventListener("click", () => {
            this.limpiarDatosCompra();
            this.guardarEnStorage();
        });
    }

}


// const controladorO = new OradorController();
const compra = new Compra();
window.addEventListener('load', () => {
    // controladorO.cargarDatos();
    compra.recuperarStorage();
    compra.cargarBotonesEnDom();
});
