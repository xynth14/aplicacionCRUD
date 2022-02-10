//VARIABLES GLOBALES
const formularioUI = document.querySelector('#formulario');
const listarProducto = document.querySelector('#listar');

const nombreUI = document.querySelector('#nombre');
const precioUI = document.querySelector('#precio');
const cantidadUI = document.querySelector('#cantidad');
const estadoUI = document.querySelector('#estado');

let arrayListado = [];

//FUNCIONES
const crearItem = (codigo, nombre, precio, cantidad, estado) => {
	let item = {
		codigo: codigo,
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
					<td data-th="CÓDIGO">${element.codigo}</td>
					<td data-th="PRODUCTO">${element.nombre}</td>
					<td data-th="PRECIO">${element.precio}</td>
					<td data-th="CANTIDAD">${element.cantidad}</td>
					<td data-th="ESTADO">${element.estado}</td>
					<td data-th="ACCIONES">
						<i class="icon-edit">e</i>
						<i class="icon-trash">d</i>
					</td>
				</tr>`;
				item++;
		})
	}
}

const eliminarDB = (codigo) => {
	let indexArray;
	arrayListado.forEach((elemento, index) => {
		if(elemento.codigo == codigo){
			indexArray = index;
		}
	});
	arrayListado.splice(indexArray, 1);
	guardarDB();
}

const editarDB = (codigo) => {
	document.querySelector('.btnGuardar').style.display = "none";
	document.querySelector('.btnActualizar').style.display = "block";
	formularioUI.style.background = "#eda71842";

	let indexArray;	
	arrayListado.forEach((elemento, index) => {
		if(elemento.codigo == codigo){
			indexArray = index;
			document.querySelector('.codigo').innerHTML = arrayListado[indexArray].codigo;
			nombreUI.value = arrayListado[indexArray].nombre;
			precioUI.value = arrayListado[indexArray].precio;
			cantidadUI.value = arrayListado[indexArray].cantidad;
			estadoUI.value = arrayListado[indexArray].estado;
		}
	});
}

function mostrar_menumv() {
	let element = document.getElementById("btn-mv");
	element.classList.toggle("act-mv");
}

//EVENTLISTENER
document.querySelector('.btnActualizar').addEventListener('click', (e) => {
	e.preventDefault();
	codigo = document.querySelector('.codigo').innerHTML;
	nombre = nombreUI.value;
	precio = precioUI.value;
	cantidad = cantidadUI.value;
	estado = estadoUI.value;
	
	let indexArray = arrayListado.findIndex((elemento) => elemento.codigo == codigo);
	arrayListado[indexArray].nombre = nombre;
	arrayListado[indexArray].precio = precio;
	arrayListado[indexArray].cantidad = cantidad;
	arrayListado[indexArray].estado = estado;
	guardarDB();
	formularioUI.reset();
	formularioUI.style.background = "var(--color2)";
	document.querySelector('.btnGuardar').style.display = "block";
	document.querySelector('.btnActualizar').style.display = "none";
})

document.querySelector('.btnGuardar').addEventListener('click', (e) => {
	e.preventDefault();
	let codigo = Date.now();
	let nombre = nombreUI.value;
	let precio = precioUI.value;
	let cantidad = cantidadUI.value;
	let estado = estadoUI.value;
	
	crearItem(codigo, nombre, precio, cantidad, estado);
	guardarDB();
	formularioUI.reset();
})

document.addEventListener('DOMContentLoaded', pintarDB);

listarProducto.addEventListener('click', (e) => {
	e.preventDefault();
	let item = e.path[2].childNodes[3].innerHTML;

	//Editar
	if(e.target.innerHTML === 'e'){
		editarDB(item);
	}

	//eliminar
	if(e.target.innerHTML === 'd'){
		eliminarDB(item);
	}

});