
let divContenedor = document.getElementsByClassName('contenedor-cartas') 
let template = document.querySelector('.contenedor-cartas')
const datos = {
    contenedor: '.contenedor-cartas'
};
  
const contenedorCartas = document.querySelector(datos.contenedor);

const boton1 = document.getElementsByClassName('boton1')[0];
const boton2 = document.querySelector('.boton2');
boton1.addEventListener('click',()=>{
  console.log('Botón 1 clickeado!');
  mostrarToast()
});

boton2.addEventListener('click', ()=> {
  console.log('Botón 2 clickeado!');
  mostrarToast()
});

//Agregando las tostaditas
function mostrarToast(){
    Toastify({
        text: '¡Agregado al carrito 🌟!',
        duration: 2000,
        position: 'center',
    }).showToast();
}

const totalPagoAmount = document.getElementById('total-pago-amount');
let total = 0;
boton1.addEventListener('click', () => {
  total += 35499;
  actualizarTotal();
  guardarCompra();

});
boton2.addEventListener('click', () => {
  total += 22500;
  actualizarTotal();
  guardarCompra();
});

function actualizarTotal() {
  totalPagoAmount.innerText = `¡Total del pago🤑!: $${total}`;
}

// Función para guardar la compra en localStorage
function guardarCompra() {
  localStorage.setItem('totalCompra', total);
}

// Función para recuperar la compra de localstorage
function recuperarCompra() {
  const totalGuardado = localStorage.getItem('totalCompra');
  if (totalGuardado) {
    total = parseInt(totalGuardado);
    actualizarTotal();
  }
}

//Aca lo que hacemos es que mediante un boton llamado cancelar compra, la compra se resetee a 0


document.addEventListener('DOMContentLoaded', function() {
  recuperarCompra();
});

document.querySelector('.cancelar-compra').addEventListener('click', ()=>{
  total = 0;
  actualizarTotal()
  localStorage.removeItem('totalCompra');
})

//Tostadita para el realizar compra



document.querySelector('.hacer-compra').addEventListener('click', ()=> {
  Toastify({
    text: '¡Gracias por realizar la compra!',
    duration: 2000,
    position: 'center',
  }).showToast();
})

document.querySelector('.hacer-compra').addEventListener('click', ()=>{
  total = 0;
  actualizarTotal()
  localStorage.removeItem('totalCompra');
})

fetch('https://fakestoreapi.com/products')
  .then(res => res.json())
  .then(json => json.forEach(producto => {
    const card = document.createElement('div');
    card.className = 'card';
    card.style.width = '18rem';

    const img = document.createElement('img');
    img.src = producto.image;
    img.alt = producto.title; 
    img.className = 'card-img-top';
    card.appendChild(img);

    const cardBody = document.createElement('div');
    cardBody.className = 'card-body';

    const cardTitle = document.createElement('h5');
    cardTitle.className = 'card-title';
    cardTitle.innerText = producto.title;
    cardBody.appendChild(cardTitle);

    const cardText = document.createElement('p');
    cardText.className = 'card-text';
    cardText.textContent = producto.description;
    cardBody.appendChild(cardText);

    const precio = document.createElement('span');
    precio.textContent = `$${producto.price}`;
    cardBody.appendChild(precio);

    const boton = document.createElement('a');
    boton.className = 'btn btn-primary';
    boton.textContent = 'Agregar al carrito';
    boton.style.marginRight = '200px'; // Añade el margen de 10px a la derecha

    // Agregar evento de click al botón
    boton.addEventListener('click', () => {
      console.log(`Botón de ${producto.title} clickeado!`);
      mostrarToast();

      // Sumar el precio del producto al total
      total += producto.price;
      actualizarTotal();
      guardarCompra();
    });

    cardBody.appendChild(boton);

    card.appendChild(cardBody);
    contenedorCartas.appendChild(card);
  }))
  .catch(error => console.error('Error', error));

function mostrarToast(){
    Toastify({
        text: '¡Agregado al carrito 🌟!',
        duration: 2000,
        position: 'center',
    }).showToast();
}
