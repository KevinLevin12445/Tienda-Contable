const product = [
    {
		"id": 1,
		"title": "Contabilidad Mensual para Empresas",
		"price":  6009,
		"image": "https://cdn.shopify.com/s/files/1/0549/3217/7072/products/contabilidad-persona-moral_large.jpg?v=1622761732"
	},
	{
		"id": 2,
		"title": "Contabilidad Mensual para Personas Físicas",
		"price": 4013,
		"image": "https://cdn.shopify.com/s/files/1/0549/3217/7072/products/contabilidad-PF-otros-actividad-empresarial_large.jpg?v=1622761869"
	},
	{
		"id": 3,
		"title": "Contabilidad Mensual para Hosts Airbnb",
		"price": 1560,
		"image": "https://cdn.shopify.com/s/files/1/0549/3217/7072/products/Contabilidad-Host-Airbnb_large.jpg?v=1621379474"
	}
]
const categories = [...new Set(product.map((item)=>
    {return item}))]
    let i=0;
document.getElementById('root').innerHTML = categories.map((item)=>
{
    var {image, title, price} = item;
    return(
        `<div class='box'>
            <div class='img-box'>
                <img class='images' src=${image}></img>
            </div>
        <div class='bottom'>
        <p>${title}</p>
        <h2>$ ${price}.00</h2>`+
        "<button onclick='addtocart("+(i++)+")'>Add to cart</button>"+
        `</div>
        </div>`
    )
}).join('')

var cart =[];

function addtocart(a){
    cart.push({...categories[a]});
    displaycart();
}
function delElement(a){
    cart.splice(a, 1);
    displaycart();
}

function displaycart(){
    let j = 0, total=0;
    document.getElementById("count").innerHTML=cart.length;
    if(cart.length==0){
        document.getElementById('cartItem').innerHTML = "Your cart is empty";
        document.getElementById("total").innerHTML = "$ "+0+".00";
    }
    else{
        document.getElementById("cartItem").innerHTML = cart.map((items)=>
        {
            var {image, title, price} = items;
            total=total+price;
            document.getElementById("total").innerHTML = "$ "+total+".00";
			return (
				`<div class='cart-item'>
				  <div class='row-img'>
					<img class='rowimg' src=${image}>
				  </div>
				  <a href="../paginas/chatIA.html" class="chat-icon"><i class='fa-solid fa-comment-dots'></i></a> <!-- Chat icon with link -->
				  <i class='fa-solid fa-trash' onclick='delElement(${j++})'></i>
				  <p style='font-size: 12px;'>${title}</p>
				  <h2 style='font-size: 15px;'>$ ${price}.00</h2>
				</div>`
			  );
        }).join('');
    }

    
}

// Función para procesar el mensaje del usuario y generar la respuesta del chatbot
function procesarMensaje(mensaje) {
	mensaje = mensaje.toLowerCase(); // Convertir el mensaje a minúsculas para facilitar el procesamiento
  
	// Comprobar diferentes casos y generar la respuesta correspondiente
	if (mensaje.includes('hola') || mensaje.includes('saludos')) {
	  return '¡Hola! ¿Cómo puedo ayudarte?';
	} else if (mensaje.includes('cómo estás') || mensaje.includes('qué tal')) {
	  return 'Estoy programado para responder tus preguntas. ¿En qué puedo ayudarte hoy?';
	} else if (mensaje.includes('métodos de pago') || mensaje.includes('formas de pago')) {
	  return 'Aceptamos pagos a través de Daviplata y Nequi. ¿Necesitas más información sobre los pagos?';
	} else {
	  return 'Lo siento, no entiendo tu pregunta. ¿Podrías ser más específico?';
	}
  }
  
  // Ejemplo de uso
  console.log(procesarMensaje('Hola')); // Salida: ¡Hola! ¿Cómo puedo ayudarte?
  console.log(procesarMensaje('¿Cómo estás?')); // Salida: Estoy programado para responder tus preguntas. ¿En qué puedo ayudarte hoy?
  console.log(procesarMensaje('Cuáles son los métodos de pago?')); // Salida: Aceptamos pagos a través de Daviplata y Nequi. ¿Necesitas más información sobre los pagos?
  console.log(procesarMensaje('¿Qué servicios ofrecen?')); // Salida: Lo siento, no entiendo tu pregunta. ¿Podrías ser más específico?
  

