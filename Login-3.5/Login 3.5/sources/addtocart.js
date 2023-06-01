const product = [
    {
		"id": 1,
		"title": "Contabilidad Mensual para Empresas",
		"price":  6009,
        "info":"Detalles: Lorem impsum",
		"image": "https://cdn.shopify.com/s/files/1/0549/3217/7072/products/contabilidad-persona-moral_large.jpg?v=1622761732"
	},
	{
		"id": 2,
		"title": "Contabilidad Mensual para Personas Físicas",
        "info":"Detalles: Lorem impsum",
		"price": 4013,
		"image": "https://cdn.shopify.com/s/files/1/0549/3217/7072/products/contabilidad-PF-otros-actividad-empresarial_large.jpg?v=1622761869"
	},
	{
		"id": 3,
		"title": "Contabilidad Mensual para Hosts Airbnb",
        "info":"Detalles: Lorem impsum",
		"price": 1560,
		"image": "https://cdn.shopify.com/s/files/1/0549/3217/7072/products/Contabilidad-Host-Airbnb_large.jpg?v=1621379474"
	}
]
const categories = [...new Set(product.map((item)=>
    {return item}))]
    let i=0;
    document.getElementById('root').innerHTML = categories.map((item) => {
        var { image, title, price, info } = item;
        return (
          `<div class='box'>
            <div class='img-box'>
              <img class='images' src=${image}></img>
            </div>
            <div class='bottom'>
              <p>${title}</p>
              <p>${info}</p> <!-- Agregar esta línea -->
              <h2>$ ${price}.00</h2>
              <button onclick='addtocart(${i++})'>Add to cart</button>
            </div>
          </div>`
        );
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
                  <a href='../paginas/chatIA.html'>
                    <i class='fas fa-shopping-cart'></i> <!-- Icono del carrito de compras -->
                  </a>
                  <i class='fa-solid fa-trash' onclick='delElement(${j++})'></i>
                  <p style='font-size: 19px;'>${title}</p>
                  <h2 style='font-size: 19px;'>$ ${price}.00</h2>
                </div>`
              );
              
                    
        }).join('');
    }
}

      

