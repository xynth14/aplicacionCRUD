//VARIABLES GLOBALES
const formularioUI = document.querySelector('#formulario');
const listarProducto = document.querySelector('#listar');

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
			//console.log(indexArray);
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
			document.querySelector('#nombre').value = arrayListado[indexArray].nombre;
			document.querySelector('#precio').value = arrayListado[indexArray].precio;
			document.querySelector('#cantidad').value = arrayListado[indexArray].cantidad;
			document.querySelector('#estado').value = arrayListado[indexArray].estado;
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
	nombre = document.querySelector('#nombre').value;
	precio = document.querySelector('#precio').value;
	cantidad = document.querySelector('#cantidad').value;
	estado = document.querySelector('#estado').value;
	
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
	let nombre = document.querySelector('#nombre').value;
	let precio = document.querySelector('#precio').value;
	let cantidad = document.querySelector('#cantidad').value;
	let estado = document.querySelector('#estado').value;
	
	crearItem(codigo, nombre, precio, cantidad, estado);
	guardarDB();
	formularioUI.reset();
})

document.addEventListener('DOMContentLoaded', pintarDB)

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