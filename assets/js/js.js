//VARIABLES GLOBALES
const formularioUI = document.querySelector('#formulario');
const listarProducto = document.querySelector('#main-lista');

let arrayListado = [];


//FUNCIONES

const crearItem = (nombre, precio, cantidad, estado) => {
	let item = {
		nombre: nombre,
		precio: precio,
		cantidad: cantidad,
		estado: estado
	}

	arrayListado.push(item);

	return item;
}

const guardarDB = () => {
	localStorage.setItem('data', JSON.stringify(arrayListado));
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

	console.log(arrayListado);
})