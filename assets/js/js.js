//VARIABLES GLOBALES
const formularioUI = document.querySelector('#formulario');
const listarProducto = document.querySelector('#listar');

let arrayListado = [];


//FUNCIONES

const crearItem = (nombre, precio, cantidad, estado) => {
	let item = {
		nombre: nombre,
		precio: precio,
		cantidad: cantidad,
		estado: estado
	}

	arrayListado.unshift(item);

	return item;
}

const guardarDB = () => {
	localStorage.setItem('data', JSON.stringify(arrayListado));

	pintarDB();
}

const pintarDB = () => {
	listarProducto.innerHTML = '';

	arrayListado = JSON.parse(localStorage.getItem('data'));

	if(arrayListado === null){
		arrayListado = [];
	}else{
		let item = 1;
		arrayListado.forEach(element => {
			listarProducto.innerHTML += `<tr>
					<td data-th="ITEM">${item}</td>
					<td data-th="PRODUCTO">${element.nombre}</td>
					<td data-th="PRECIO">${element.precio}</td>
					<td data-th="CANTIDAD">${element.cantidad}</td>
					<td data-th="ESTADO">${element.estado}</td>
					<td data-th="ACCIONES">
						<i class="icon-edit"></i>
						<i class="icon-trash"></i>
					</td>
				</tr>`;
				item++;
		})
	}

}

function mostrar_menumv() {
	let element = document.getElementById("btn-mv");
	element.classList.toggle("act-mv");
}

//EVENTLISTENER

formularioUI.addEventListener('submit', (e) => {
	e.preventDefault();

	let nombre = document.querySelector('#nombre').value;
	let precio = document.querySelector('#precio').value;
	let cantidad = document.querySelector('#cantidad').value;
	let estado = document.querySelector('#estado').value;

	crearItem(nombre, precio, cantidad, estado);
	guardarDB();
	formularioUI.reset();
})

document.addEventListener('DOMContentLoaded', pintarDB)