// Seleccionamos el elemento del DOM con la clase ".productos__center" y lo guardamos en la constante "productoDOM"
const productoDOM = document.querySelector(".productos__center")

// Seleccionamos el elemento del DOM con la clase ".carrito" y lo guardamos en la constante "carritoDOM"
const carritoDOM = document.querySelector(".carrito")

// Seleccionamos el elemento del DOM con la clase ".carrito__center" y lo guardamos en la constante "carritoCenter"
const carritoCenter = document.querySelector(".carrito__center")

// Seleccionamos el elemento del DOM con la clase ".carrito__icon" y lo guardamos en la constante "openCarrito"
const openCarrito = document.querySelector(".carrito__icon")

// Seleccionamos el elemento del DOM con la clase ".close__carrito" y lo guardamos en la constante "closeCarrito"
const closeCarrito = document.querySelector(".close__carrito")

// Seleccionamos el elemento del DOM con la clase ".carrito__overlay" y lo guardamos en la constante "overlay"
const overlay = document.querySelector(".carrito__overlay")

// Seleccionamos el elemento del DOM con la clase ".carrito__total" y lo guardamos en la constante "carritoTotal"
const carritoTotal = document.querySelector(".carrito__total")

// Seleccionamos el elemento del DOM con la clase ".clear__carrito" y lo guardamos en la constante "clearCarritoBtn"
const clearCarritoBtn = document.querySelector(".clear__carrito")

// Seleccionamos el elemento del DOM con la clase ".item__total" y lo guardamos en la constante "itemTotales"
const itemTotales =document.querySelector(".item__total")

// Seleccionamos el elemento del DOM con el ID "detalles" y lo guardamos en la constante "detalles"
const detalles = document.getElementById('detalles')

// Creamos un array vacío llamado "carrito"
let carrito = [];

// Creamos un array vacío llamado "buttonDOM"
let buttonDOM = []

class UI {
  // Clase que maneja la interfaz de usuario
	renderProductos(productos){
		 // Método que recibe un array de productos y los muestra en la págin
		let result = ""
   // Variable que almacenará el HTML que se va a mostrar en la página

		productos.forEach((producto) =>{
		// Itera por cada producto del array y crea el HTML correspondiente
			result += `
			<div class="producto">
			<div class="image__container">
			<img src=${producto.image} alt="">
		</div>
          <div class="producto__footer">
            <h1>${producto.title}</h1>
            <div class="price">$${producto.price}</div>
          </div>
          <div class="bottom">
            <div class="btn__group">
              <button class="btn addToCart" data-id=${producto.id}>Añadir carrito</button>
            </div>
          </div>
        </div>
				`
		});
		// Asigna el HTML generado a un elemento del DOM para mostrarlo en la página
		productoDOM.innerHTML = result
	}
    // Esta función obtiene los botones de "Añadir al carrito" de la página
	getButtons(){
		// Selecciona todos los botones con la clase "addToCart" y los convierte en un array
		const buttons = [...document.querySelectorAll(".addToCart")];
		// Guarda los botones en la variable global "buttonDOM"
		buttonDOM = buttons;
		// Itera sobre cada botón
		buttons.forEach((button)=> {
			// Obtiene el ID del producto del atributo "data-id" del botón
			const id = button.dataset.id;
			// Verifica si el producto ya está en el carrito
			const inCart = carrito.find(item => item.id === parseInt(id, 10));
		
			// Si el producto ya está en el carrito, cambia el texto del botón a "En el carrito" y lo desactiva
            if(inCart){
				button.innerHTML = "En el carrito";
				button.disabled = true;
			}
			// Agrega un evento de clic al botón
			button.addEventListener("click", e =>{
				e.preventDefault();
				e.target.innerHTML = "En el carrito";
				e.target.disabled = true;
				

				// GET productos al carrito
				const carritoItem = {...Storage.getProductos(id), cantidad: 1}

				//agregamos el producto al carrito
				carrito = [...carrito, carritoItem]

				//Guardamos el carrito al localstorage
				Storage.saveCart(carrito)

				//guarda lo q seleccionamos en añadir carrito
				this.setItemValues(carrito)
				this.addCarritoItem(carritoItem)
				//se muestra en el carrito al carrito
			})
		})
	}

	// Esta función toma el carrito como argumento y calcula el total de todos los items en el carrito y el número total de items
setItemValues(carrito){
	// Inicializar variables
	let tempTotal = 0;
	let itemTotal = 0;
	// Iterar a través de cada item en el carrito
	carrito.map(item => {
		// Calcular el total del item multiplicando el precio por la cantidad
		tempTotal += item.price * item.cantidad;
		// Sumar la cantidad de este item a la variable de itemTotal
		itemTotal += item.cantidad;
	});
	// Actualizar el texto del elemento HTML con el total de carrito
	carritoTotal.innerText = parseFloat(tempTotal.toFixed(2));
	// Actualizar el texto del elemento HTML con el número total de items
	itemTotales.innerText = itemTotal;
}

	addCarritoItem({image, price, title, id}){ // función para agregar un artículo al carrito
		const div = document.createElement("div") // crea un nuevo elemento div
		div.classList.add("carrito__item")  //add a class "carrito__item" to the div element

		div.innerHTML = `
		<img src=${image} alt=${title}>  
		<div>
			<h3>${title}</h3>
			<p class="price">$${price}</p>
		</div>
		<div>
			<span class="increase" data-id=${id}>
				<i class="bx bxs-up-arrow"></i>
			</span>
			<p class="item__cantidad">1</p>
			<span class="decrease" data-id=${id}>
				<i class="bx bxs-down-arrow"></i>
			</span>
		</div>
		<div>
			<span class="remove__item" data-id=${id}>
				<i class="bx bx-trash"></i>
			</span>
		</div>
		`
		carritoCenter.appendChild(div) //agregue el elemento div a la sección del carrito
	}
	show(){
		carritoDOM.classList.add("show") // Agrega la clase "show" al elemento HTML con el id "carrito"
		overlay.classList.add("show") // Agrega la clase "show" al elemento HTML con el id "overlay"
	}
	hide(){
		carritoDOM.classList.remove("show") // Elimina la clase "show" del elemento HTML con el id "carrito"
		overlay.classList.remove("show") // Elimina la clase "show" del elemento HTML con el id "overlay"
	}
	setAPP(){
		carrito = Storage.getCart() // Asigna a "carrito" el contenido del carrito almacenado en local storage usando el método getCart() de la clase Storage
		this.setItemValues(carrito) // Actualiza los valores de los elementos del carrito usando la función setItemValues() del objeto actual
		this.populate(carrito) // Agrega los elementos del carrito usando la función populate() del objeto actual
		openCarrito.addEventListener("click", this.show) // Agrega un evento "click" al botón con id "openCart" que muestra el carrito llamando a la función show()
		closeCarrito.addEventListener("click", this.hide) // Agrega un evento "click" al botón con id "closeCart" que oculta el carrito llamando a la función hide()
	}
	populate(carrito){
		carrito.forEach(item => this.addCarritoItem(item)) // Itera a través de los elementos del carrito y los agrega usando la función addCarritoItem() del objeto actual
	}
	cartLogic(){
		clearCarritoBtn.addEventListener("click", () =>{ // Agrega un evento "click" al botón con id "clearCartBtn" que limpia el carrito llamando a la función clearCarrito() del objeto actual y oculta el carrito llamando a la función hide()
			this.clearCarrito()
			this.hide()
		});
	
		carritoCenter.addEventListener("click", e =>{ // Agrega un evento "click" al contenedor con id "carritoCenter" que maneja la lógica del carrito según el elemento clickeado
			const target = e.target.closest("span") // Obtiene el elemento "span" más cercano al elemento clickeado
			const targetElement = target.classList.contains("remove__item"); // Verifica si el elemento clickeado contiene la clase "remove__item"
			console.log(target) // Muestra en consola el elemento clickeado
			console.log(targetElement) // Muestra en consola si el elemento clickeado contiene la clase "remove__item"
			if(!target) return // Si no se clickeó un elemento "span" se sale de la función
			if(targetElement){ // Si el elemento clickeado es un botón de eliminar
				const id = parseInt(target.dataset.id); // Obtiene el id del elemento clickeado
				this.removeItem(id) // Elimina el elemento del carrito usando la función removeItem() del objeto actual
				carritoCenter.removeChild(target.parentElement.parentElement) // Elimina el elemento del DOM
			}else if(target.classList.contains("increase")){ // Si el elemento clickeado es un botón de aumentar cantidad
				const id = parseInt(target.dataset.id, 10); // Obtiene el id del elemento clickeado
				let tempItem = carrito.find(item => item.id === id); // Busca el elemento en el carrito con el id correspondiente
				tempItem.cantidad++; // Aumenta la cantidad del elemento
				Storage.saveCart(carrito) // Guarda el carrito actual
				this.setItemValues(carrito) // llama a un método llamado setItemValues y le pasa el parámetro carrito. Este método actualiza los valores del carrito, como el total de la compra y la cantidad total de artículos.
				target.nextElementSibling.innerText = tempItem.cantidad //actualiza el texto del siguiente elemento hermano del elemento target con la cantidad actualizada de un artículo en el carrito. target se refiere al elemento de la página HTML en el que se hizo clic para aumentar o disminuir la cantidad de un artículo. En este caso, target.nextElementSibling se refiere al elemento hermano que contiene la cantidad actualizada. El innerText del elemento se actualiza con la cantidad actualizada tempItem.cantidad.
			}else if(target.classList.contains("decrease")){ ///Este es el inicio del bloque condicional que se ejecutará si el usuario hace clic en el botón "disminuir"
				const id = parseInt(target.dataset.id, 10); // Esta línea de código convierte el ID del producto en una variable de tipo número entero.
				let tempItem = carrito.find(item => item.id === id); //Esta línea busca el elemento del carrito que tiene el mismo ID que el elemento en el que se hizo clic y lo guarda en una variable temporal llamada tempItem.
				tempItem.cantidad--; //Esta línea reduce en uno la cantidad del producto seleccionado.

				if(tempItem.cantidad > 0){ //Este condicional verifica si la cantidad del producto seleccionado es mayor que cero.
					Storage.saveCart(carrito); //Si se cumple la condición anterior, esta línea guarda la información actualizada del carrito en el almacenamiento local del navegador.
					this.setItemValues(carrito); //Esta línea actualiza los valores en el carrito con la cantidad y el precio actualizados.
					target.previousElementSibling.innerText = tempItem.cantidad; //Esta línea actualiza la cantidad de productos que se muestran en la interfaz del usuario.
				}else{ //Si la cantidad del producto seleccionado es cero o menos, se ejecuta esta sección del condicional.
					this.removeItem(id); //Esta línea elimina el elemento del carrito de compras.
					carritoCenter.removeChild(target.parentElement.parentElement) //Esta línea elimina la fila correspondiente al producto seleccionado de la interfaz del usuario.
				}
			}
		});
	}
	clearCarrito(){ // Define una función llamada clearCarrito que vacía el carrito.
		const cartItems = carrito.map(item => item.id) // Crea un nuevo array con los ids de los productos del carrito.
		cartItems.forEach(id => this.removeItem(id)) // Itera sobre este array y remueve cada producto utilizando la función removeItem().
      // Finalmente, el while elimina todos los elementos de la vista del carrito.
		while(carritoCenter.children.length > 0){ 
			carritoCenter.removeChild(carritoCenter.children[0])
		}
	}

	// Esta función remueve un item del carrito dado su id
	removeItem(id){
		// Filtra el carrito dejando sólo los items que no tienen el id especificado
		carrito = carrito.filter(item => item.id !== id);
		// Actualiza los valores del carrito
		this.setItemValues(carrito)
		// Guarda el carrito en el almacenamiento local
		Storage.saveCart(carrito)
		// Obtiene el botón correspondiente al item eliminado
         let button = this.singleButton(id);
		if(button){
			// Habilita el botón y cambia su texto
			button.disabled = false;
			button.innerText = "Añadir carrito"
		}
	}
	// Retorna el botón correspondiente a un id de item específico
	singleButton(id){
		return buttonDOM.find(button => parseInt(button.dataset.id) === id)
	}
}


// Esta es la clase Storage que tiene métodos estáticos para guardar y obtener información del carrito de compras y de los productos desde el almacenamiento local del navegador
class Storage {
	// Este método guarda los productos en el almacenamiento local
	static saveProduct(obj){
		localStorage.setItem("productos", JSON.stringify(obj))
	}
	// Este método guarda el carrito de compras en el almacenamiento local
	static saveCart(carrito){
		localStorage.setItem("carrito", JSON.stringify(carrito))
	}
	// Este método obtiene los productos del almacenamiento local con el id del producto como parámetro de entrada
	static getProductos(id){
		const producto = JSON.parse(localStorage.getItem("productos"))
		return producto.find(product =>product.id === parseFloat(id, 10))
	}
	// Este método obtiene el carrito de compras del almacenamiento local
	static getCart(){
		// si el carrito de compras existe, lo convierte de una cadena JSON a un objeto JavaScript y lo devuelve; de lo contrario, devuelve un array vacío
		return localStorage.getItem("carrito") ? JSON.parse(localStorage.getItem("carrito")) : [];
	}
}

// Definir una clase llamada 'Productos'
class Productos {
// Definir un método asíncrono llamado 'getProductos'
  async getProductos() { 
    try {
		    // Enviar una solicitud al servidor para obtener datos del archivo JSON llamado "productos.json"
			const result = await fetch("../json/productos.json")
			// Convertir los datos de respuesta en un objeto JSON
			const data = await result.json()
			// Obtener la matriz de 'elementos' del objeto JSON
			const productos = data.items
			// Devuelve el array 'productos'
			return productos
		// Si hay algún error, registra el error en la consola
		}catch(err){
			console.log(err)
		}
  }
}
// Se crea una nueva instancia de URLSearchParams para obtener los parámetros de la URL actual
const query = new URLSearchParams(window.location.search)
// Se obtiene el valor del parámetro "id" de la URL actual y se asigna a la variable "id"
let id = query.get('id')

// Se agrega un event listener que se ejecuta cuando el DOM se ha cargado completamente
document.addEventListener("DOMContentLoaded", async () =>{
	// Se crea una nueva instancia de la clase Productos
    const productosLista = new Productos();
	// Se crea una nueva instancia de la clase UI
    const ui = new UI();
    // Se llama al método "setAPP" de la instancia de UI para configurar la aplicación
	ui.setAPP()
    // Se obtienen los productos y se asignan a la variable "productos" usando el método "getProductos" de la instancia de Productos
	productos = await productosLista.getProductos()
	
	// Si se proporcionó un valor para el parámetro "id" en la URL
    if(id){
		// Se llama al método "detalleProducto" de la instancia de UI para mostrar los detalles del producto con el id proporcionado
	ui.detalleProducto(id)
	// Se llama al método "saveProduct" de la clase Storage para guardar los productos en el almacenamiento local
	Storage.saveProduct(productos)
	// Se llama al método "getButtons" de la instancia de UI para configurar los botones de agregar al carrito
	ui.getButtons();
	// Se llama al método "cartLogic" de la instancia de UI para configurar la lógica del carrito de compras
	ui.cartLogic();
	}else{
	
	// Si no se proporcionó un valor para el parámetro "id" en la URL, se muestran todos los productos
	ui.renderProductos(productos)
	// Se llama al método "saveProduct" de la clase Storage para guardar los productos en el almacenamiento local
	Storage.saveProduct(productos)
	// Se llama al método "getButtons" de la instancia de UI para configurar los botones de agregar al carrito
	ui.getButtons();
	// Se llama al método "cartLogic" de la instancia de UI para configurar la lógica del carrito de compras
	ui.cartLogic();
	}
})

