let catalogo = JSON.parse(localStorage.getItem("productos")) || [
    {nombre: "Ajo", rubro: "Verdulería", stock: 30},
    {nombre: "Shampoo", rubro: "Higiene", stock: 70},
    {nombre: "Salamín", rubro: "Sachinados", stock: 300},
    {nombre: "Ají", rubro: "Condimentos", stock: 10},
];

const cuerpotabla = document.getElementById("cuerpo");
const popup = document.getElementById("pop-up");
const nuevoStockInput = document.getElementById("nuevo-stock-id");
const cerrarpopup = document.getElementById("cerrar");

const popup2 = document.getElementById("pop-up2");
const nombreNuevoP = document.getElementById("nombre-nuevo-p");
const rubroNuevoP = document.getElementById("rubro-nuevo-p");
const stockNuevoP = document.getElementById("stock-nuevo-p");
const cerrarpopup2 = document.getElementById("cerrar2");
let productoActual;

function guardarJSON(catalogo) {
    localStorage.setItem("productos", JSON.stringify(catalogo));
}

function tableado() {
    cuerpotabla.innerHTML = ""; 
    catalogo.forEach((elemento, index) => {
        const filas = document.createElement("tr");
        Object.values(elemento).forEach(valor => {
            const celda = document.createElement("td");
            celda.textContent = valor;
            filas.appendChild(celda);
        });

        const celdaBotones = document.createElement("td");

        const eliminar = document.createElement("button");
        eliminar.id = "btn-eliminar";
        eliminar.textContent = "Eliminar producto";

        const cambiarstock = document.createElement("button");
        cambiarstock.id = "btn-cambiarstock";
        cambiarstock.textContent = "Modificar Stock";

        cambiarstock.addEventListener("click", () => {
            productoActual = index;
            nuevoStockInput.value = catalogo[productoActual].stock;
            popup.showModal();
        });

        eliminar.addEventListener("click", () => {
            catalogo.splice(index, 1);
            guardarJSON(catalogo);
            tableado();
        });

        celdaBotones.appendChild(eliminar);
        celdaBotones.appendChild(cambiarstock);
        filas.appendChild(celdaBotones);

        cuerpotabla.appendChild(filas);
    });
}

cerrarpopup.addEventListener("click", () => {
    const nuevo = parseInt(nuevoStockInput.value);
    if (!isNaN(nuevo)) {
        catalogo[productoActual].stock = nuevo;
        guardarJSON(catalogo);
        tableado();
    }
    popup.close();
});

const crearp = document.getElementById("crear-p-btn");
crearp.addEventListener("click", () => {
    popup2.showModal();
});
cerrarpopup2.addEventListener("click", () => {
    if (nombreNuevoP.value && rubroNuevoP.value && !isNaN(parseInt(stockNuevoP.value))) {
        catalogo.push({nombre: nombreNuevoP.value, rubro: rubroNuevoP.value, stock: parseInt(stockNuevoP.value)});
        guardarJSON(catalogo);
        tableado();
        popup2.close();
        nombreNuevoP.value = "";
        rubroNuevoP.value = "";
        stockNuevoP.value = "";
    } 
    else {
        alert("Algo ta mal (corroborar si faltó ingresar algún dato).");
    }
});

const ordenarAlfabeticamente = document.getElementById("1");
ordenarAlfabeticamente.addEventListener("click", () => {
    catalogo = catalogo.sort((a, b) => a.nombre.localeCompare(b.nombre))
    guardarJSON(catalogo);
    tableado();
});

const ordenarRubros = document.getElementById("2");
ordenarRubros.addEventListener("click", () => {
    catalogo = catalogo.sort((a, b) => a.rubro.localeCompare(b.rubro))
    guardarJSON(catalogo);
    tableado();
});

let contador = 1;
const ordenarStock = document.getElementById("3");
ordenarStock.addEventListener("click", () => {
    contador = contador + 1;
    if (contador === 2) {
        catalogo = catalogo.sort((b, a) => a.stock - b.stock);
    guardarJSON(catalogo);
    tableado();
    }
    else {
        catalogo = catalogo.sort((a, b) => a.stock - b.stock);
    guardarJSON(catalogo);
    tableado();
    contador =  1;
    }
});

tableado();

