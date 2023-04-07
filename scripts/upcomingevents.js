let c = console.log;

//este es el task numero 3 ya...
let plantillaCard = "";

//mensaje global cards informacion
let mensajeglobal = "";

//creamos h1 de mensje de no coincidiencia
let h1 = document.createElement("h1");
h1.setAttribute("id", "estiloh1");

const cardWrapper = document.querySelector(".card-wrapper");

//agregamos elipsis al final del texto descriptivo
function textoLength(texto, maximopermitido) {
  return `${texto.slice(0, maximopermitido)} …`;
}

//ver si hay valores duplicados en el array
const fnDuplicado = (arrayvalue) =>
  new Set(arrayvalue).size < arrayvalue.length;

  // ========================= CurrentDateNow() ==========================
function currentDateNow() {
  //Primero patron para solo numeros
  let regex = /(\d+)/g;

  let fechaActual = "";

  //segundo traemos solo los numeros
  let numerosActuales = data.currentDate.match(regex);

  //tercero unimos toda la fecha con solo numeros
  fechaActual = numerosActuales.join("");

  return fechaActual;
}
// ========================= CurrentDateNow() ==========================

// ========================= RENDERIZAR() ==========================
function CrearCards() {
  for (let card of data.events) {
    let patt1 = /[0-9]/g;
    //let fechaActual = 20220101;

    //Primero patron para solo numeros
    let regex = /(\d+)/g;

    //segundo traemos solo los numeros
    let numeros = card.date.match(regex);

    //tercero unimos toda la fecha con solo numeros
    let fecha = numeros.join("");

    //si la fecha es mayor al currentDate entonces es upcoming event
    if (fecha > currentDateNow()) {
      //c(card._id+" es upcoming events");

      plantillaCard += `
     <div class="card card1">
     <div class="card-header">
       <div class="imagen">
         <img src="${card.image}" alt="imagen card 1">
       </div>
       
     </div>
     <div class="card-main">
       <div class="titulos">
         <h1>${card.name}</h1>
         <p>${textoLength(card.description, 40)}</p>
       </div>
 
     </div>
     <div class="card-footer">
       <div class="footer">
         <div class="titulo">
           <p>Price: $${card.price}</p>
         </div>
 
         <div class="boton">
           <button><a href="Details.html?id=${card._id}">ver mas</a></button>
         </div>
        
       </div>
 
     </div>
 
     </div>
     `;
    }
  }

  cardWrapper.innerHTML = plantillaCard;
}


// ======================== FUNCION DEVUELVE UPCOMING EVENS CARDS ===================
function upcomingcards (){
  let arr_cardupcoming = []; 

  for(dataupcoming of data.events){

     //Primero patron para solo numeros
     let regex = /(\d+)/g;

     //segundo traemos solo los numeros
     let numeros = dataupcoming.date.match(regex);

     //tercero unimos toda la fecha con solo numeros
     let fecha = numeros.join("");
 
    if(fecha > currentDateNow()){
      arr_cardupcoming.push(
        {
          _id: `${dataupcoming._id}`,
          "image":`${dataupcoming.image}`,
          "name":`${dataupcoming.name}`,
          "date":`${dataupcoming.date}`,
          "description":`${dataupcoming.description}`,
          "category":`${dataupcoming.category}`,
          "place":`${dataupcoming.place}`,
          "capacity":`${dataupcoming.capacity}`,
          "assistance":`${dataupcoming.assistance}`,
          "price":`${dataupcoming.price}`
        },
      );
    }
  }
  return arr_cardupcoming;
 
}  

// ================== funcion de buscar ===========

 //funcion para filtrar los datos por categoria
 function inputSearch(){
  const searchbtn = document.querySelector(".searchbtn");

  searchbtn.addEventListener("click", (e) => {

    const inputvalue = document.querySelector(".input-search").value;
    e.preventDefault();

    let mensajevacio =  document.createTextNode("");
    let mensajecontexto = document.createTextNode("el valor ingresado no coincide con nuestras busquedas... ");

    if(existeValue(inputvalue, upcomingcards())){

      mensaje(mensajevacio);
      recorrecards(upcomingcards());
      h1.textContent = "";
    }else{
      let cards = document.querySelectorAll(".card");
      cards.forEach(card => {
        card.classList.add("escondercards");
      });

      mensaje(mensajecontexto);
    }

  });
}

//funcion que escriba el mensaje en la card cuando no coinciden
function mensaje(mensajecard){

  let getCardWrapper = document.querySelector(".card-wrapper");

  let mensaje = document.createTextNode(`${mensajecard}`);

  if(h1.textContent.length > 3){
      h1.appendChild(document.createTextNode(""));
  }else{
    h1.appendChild(mensajecard);
  }
  return getCardWrapper.appendChild(h1);
}

//metodo retorna TRUE si existe el valor input ingresado en la categoria del array
function existeValue(inputvalue, upcomingcards){
  let coincidevalor = false;

  upcomingcards.map((value, i) => {

    if(inputvalue.toLowerCase() === value.category.toLowerCase()){
      coincidevalor = true;
    }
  });
  return coincidevalor;
}

function Checkboxfn() {
  //traemos los checkbox
  let cbs = document.querySelectorAll(".checkbox");
  let cont = 0;

  let arrayvalues = [];

  let cards = document.querySelectorAll(".card");

  for (let cb of cbs) {
    cb.addEventListener("change", function () {

      let isChecked = false; //si esta checked entonces le poasariamos true a Cbvalues()

      if (cb.checked === true) {
        
        //c(fnDuplicado(arrayvalues));
        arrayvalues.push(cb.value);

        if (fnDuplicado(arrayvalues)) {
        }
        

        isChecked = true;
      } else {
        arrayvalues = arrayvalues.filter(
          (arrayvalue) => arrayvalue !== cb.value
        );

        isChecked = false;
      }

      Cbvalues(cards, upcomingcards(), isChecked, arrayvalues);
    });

    cont++;
  }
}

//trabajaremos en los checkboxes
function Cbvalues(cardsdiv, upcomingdata, ischeked, arraDeSeleccionados) {

  let i = 0;

  let cbs = document.querySelectorAll(".checkbox");

  for (let data of upcomingdata) {
    cardsdiv[i].classList.add("escondercards"); // forzaremos a que tenga display none al inicio

    arraDeSeleccionados.map((seleccionado) => {
      // (arrDeSeleccionados) trae a todos los checkeados

      if (seleccionado == data.category) {

        cardsdiv[i].classList.contains("escondercards")
          ? cardsdiv[i].classList.remove("escondercards")
          : cardsdiv[i].classList.add("");
      }
    });

    if (arraDeSeleccionados.length === 0) {
      // si la lista de seleccionados "chekeados" esta vacia, mostramos todas las cards
      cardsdiv[i].classList.remove("escondercards");
    }

    i++;
  }
}

//recorre y renderiza las cards
function recorrecards(arrayupcoming) {
  const inputvalue = document.querySelector(".input-search").value;
  let cards = document.querySelectorAll(".card");

  arrayupcoming.map((card, i) => {
    if (inputvalue.toLowerCase() === card.category.toLowerCase()) {
      if (cards[i].classList.contains("escondercards")) {
        cards[i].classList.remove("escondercards");
      }
    } else {
      if (!cards[i].classList.contains("escondercards")) {
        cards[i].classList.add("escondercards");
      }
    }
  });
}

upcomingcards();
CrearCards();
inputSearch();
Checkboxfn();