let c = console.log;

let plantillaCard = "";

//mensaje global cards informacion
let mensajeglobal = "";

//creamos h1 de mensje de no coincidiencia
let h1 = document.createElement("h1");
h1.setAttribute("id", "estiloh1");

//agregamos elipsis al final del texto descriptivo
function textoLength(texto, maximopermitido) {
  return `${texto.slice(0, maximopermitido)} …`;
}

//ver si hay valores duplicados en el array
const fnDuplicado = (arrayvalue) => new Set(arrayvalue).size < arrayvalue.length;

// ======================== FUNCION DEVUELVE HOME CARDS ===================
function homecards (){
  let arr_cardupcoming = []; 
  for(datahome of data.events){
      arr_cardupcoming.push(
        {
          _id: `${datahome._id}`,
          "image":`${datahome.image}`,
          "name":`${datahome.name}`,
          "date":`${datahome.date}`,
          "description":`${datahome.description}`,
          "category":`${datahome.category}`,
          "place":`${datahome.place}`,
          "capacity":`${datahome.capacity}`,
          "assistance":`${datahome.assistance}`,
          "price":`${datahome.price}`
        },
      );
  }
  return arr_cardupcoming;
}  

const cardWrapper = document.querySelector(".card-wrapper");

//funcion para filtrar los datos por categoria
const inputvalue = document.querySelector(".input-search").value;
const searchbtn = document.querySelector(".searchbtn");

let mensajecards = "";

function CrearCards() {
  data.events.filter((card) => {
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
  });
  cardWrapper.innerHTML = plantillaCard;
}

function insertSearchValue(){

  const searchbtn = document.querySelector(".searchbtn");


  searchbtn.addEventListener("click", (e) => {
    const inputvalue = document.querySelector(".input-search").value;

    e.preventDefault();

    let mensajevacio =  document.createTextNode("");
    let mensajecontexto = document.createTextNode("el valor ingresado no coincide con nuestras busquedas... ");

    if(existeValue(inputvalue, homecards())){
      mensaje(mensajevacio);
      recorrecards(homecards());
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
function existeValue(inputvalue, homecards){
  let coincidevalor = false;

  homecards.map((value, i) => {
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

  for (let cb of cbs) {
   
    cb.addEventListener("change", function () {

      let isChecked = false; //si esta checked entonces le poasariamos true a Cbvalues()

      if (cb.checked === true) {
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

      Cbvalues(data.events, isChecked, arrayvalues);
    });

    cont++;
  }
}

//trabajaremos en los checkboxes
function Cbvalues(
  datacategory,
  ischeked,
  arraDeSeleccionados
) {
  let i = 0;

  let cards = document.querySelectorAll(".card");
  let cbs = document.querySelectorAll(".checkbox");

  for (let data of datacategory) {

    cards[i].classList.add("escondercards"); // forzaremos a que tenga display none al inicio

    arraDeSeleccionados.map((seleccionado => { // (arrDeSeleccionados) trae a todos los checkeados

      if(seleccionado == data.category){
        h1.textContent = "";
        cards[i].classList.contains("escondercards") ? cards[i].classList.remove("escondercards") : cards[i].classList.add("");
      }
    }));

    if(arraDeSeleccionados.length === 0){ // si la lista de seleccionados "chekeados" esta vacia, mostramos todas las cards
      cards[i].classList.remove("escondercards");
    }

    i++;
  } 
}

//recorre y renderiza las cards
function recorrecards(arrayhome) {
  const inputvalue = document.querySelector(".input-search").value;
  let cards = document.querySelectorAll(".card");

 arrayhome.map((card, i) => {
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

CrearCards();
homecards();
insertSearchValue();
Checkboxfn();