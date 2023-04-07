let c = console.log;
let urlAPI = "https://mindhub-xj03.onrender.com/api/amazing";

let currentdateglobal = "";

async function getEvents() {
  
  let events = [];

  try {
    let response = await fetch(urlAPI);
    let dataAPI = await response.json();

    currentdateglobal = dataAPI.currentDate;

    for (const event of dataAPI.events) {
      try {
       events.push({
          _id: event._id,
          category: event.category,
          capacity: event.capacity,
          assistance: event.assistance,
          estimate: event.estimate,
          name: event.name,
          date: `${event.date}`,
          currentdate: `${currentdateglobal}`,
          price: event.price,
        });
      } catch (error) {
        console.log(error.message);
      }
    }

    cargareventotable(events);
    cargarupcomingtable(events);
    cargapasteventstable(events);
    return events;
  } catch (error) {
    console.log(error.message);
  }
}
getEvents();

// =================================== funciones para EVENTOS
function cargareventotable(events) {
  let container = document.querySelector(".tbody-events");
  let tableBodyHTML = "";

  let mayorasis =  mayorPorcentajeAsistencias(events);
  let menorasis = menorPorcentajeAsistencias(events);
  let mayorcapa = objetoConMayorCapacidad(events);

  let mayorpocentaje = ((mayorasis.assistance / mayorasis.capacity) * 100).toFixed(2);
  let menorporcentaje = ((menorasis.assistance / menorasis.capacity) * 100).toFixed(2);
  let mayorcapacidad = mayorcapa.capacity;

  tableBodyHTML += `<tr>
        <td>${mayorasis.name} : ${mayorpocentaje}%</td>
        <td>${menorasis.name} : ${menorporcentaje}%</td>
        <td>${mayorcapa.name} : ${mayorcapacidad}</td>
    </tr>`;
    container.innerHTML = tableBodyHTML;
}

function mayorPorcentajeAsistencias(datosp) {

  const mayorp = soloConAsistencias(datosp).reduce(
    (eventoanterior, eventoactual) => {
      const porcentajeanterior =
        (eventoanterior.assistance / eventoanterior.capacity) * 100;
      const porcentaactual =
        (eventoactual.assistance / eventoactual.capacity) * 100;
      return porcentajeanterior > porcentaactual
        ? eventoanterior
        : eventoactual
    }
  );

  c(
    `El objeto con mayor porcentaje de asistencia es el ${
      mayorp.name
    }, con un ${((mayorp.assistance / mayorp.capacity) * 100).toFixed(
      2
    )}% de asistencia.`
  );
  return mayorp;
}

function menorPorcentajeAsistencias(datosp) {
  const menorp = soloConAsistencias(datosp).reduce(
    (eventoanterior, eventoactual) => {
      const porcentajeanterior =
        (eventoanterior.assistance / eventoanterior.capacity) * 100;
      const porcentaactual =
        (eventoactual.assistance / eventoactual.capacity) * 100;
      return porcentajeanterior < porcentaactual
        ? eventoanterior
        : eventoactual;
    }
  );

  c(
    `El objeto con menor porcentaje de asistencia es el ${
      menorp.name
    }, con un ${((menorp.assistance / menorp.capacity) * 100).toFixed(
      2
    )}% de asistencia.`
  );
  return menorp;
}

// Método para retornar el objeto con la mayor capacidad
function objetoConMayorCapacidad(array) {
  let capacidades = array.map((objeto) => objeto.capacity);
  let mayorCapacidad = Math.max(...capacidades);
  return array.find((objeto) => objeto.capacity === mayorCapacidad);
}

//mostrar en tabla upcoming events
function cargarupcomingtable(upcomingeventsp) {
  let container = document.querySelector(".tbody-upcoming");
  let tableBodyHTML = "";
  let array_upcomingevents = upcomingevents(upcomingeventsp);

  //c(array_upcomingevents);

  // sumamnos el estimado de cada categoria en total
 let categoriassumas = array_upcomingevents.reduce(
  (anterior, actual) => {
    const categoriasencontradas = anterior.find((ant) => ant.category == actual.category);
    if(categoriasencontradas){
      categoriasencontradas.estimate += actual.estimate;
      categoriasencontradas.capacity += actual.capacity;
    }else {
      anterior.push({...actual});
    }

    return anterior;
  }, []);
 
  let arrayresulta = [];
  const resultado = categoriassumas.map(evento => {

    tableBodyHTML += `<tr>
     <td>${evento.category}</td>
     <td>$${evento.capacity}</td>
     <td>${(evento.estimate / evento.capacity * 100).toFixed(2)}%</td>
    </tr>`;

    //container.innerHTML = tableBodyHTML;
});
  container.innerHTML = tableBodyHTML;
}

// =================================== funciones para UPCOMING EVENTS

//NECESITAMOS TRAER TODAS LAS MISMAS CATEGORIAS SUMARLE SU ESTIMATE Y CAPACTY LUEGO SACAR PORCENTAJE (ESTIMA / CAPACITY) * 100
function upcomingevents(eventos) {
  let arr_cardupcoming = [];
  let i = 0;

  //c(eventos);
  for (dataupcoming of eventos) {

    //c(dataupcoming.date);

    //Primero patron para solo numeros
    let regex = /(\d+)/g;

    //segundo traemos solo los numeros
    let numeros = dataupcoming.date.match(regex);

    //tercero unimos toda la fecha con solo numeros
    let fecha = numeros.join("");

    c(fecha+" > "+eventos[0].currentdate);

    if (fecha > currentDateNow(eventos[0].currentdate)) {
      c("entro una vez al menos...");
      arr_cardupcoming.push({
        _id: dataupcoming._id,
        image: dataupcoming.image,
        name: dataupcoming.name,
        description: dataupcoming.description,
        category: dataupcoming.category,
        place: dataupcoming.place,
        capacity: dataupcoming.capacity,
        assistance: dataupcoming.assistance,
        price: dataupcoming.price,
        date: dataupcoming.date,
        estimate: dataupcoming.estimate
      });
    }

    //c(dataupcoming.name+"  "+dataupcoming.assistance);
  }
  c(arr_cardupcoming);
  return arr_cardupcoming;
}

// ============================= FUNCIONES PARA MOSTRAR EN TABLA PASTEVENTS =============================
function cargapasteventstable(pasteventsp) {
  let container = document.querySelector(".tbody-past");
  let tableBodyHTML = "";
  let array_pastevents = pastevents(pasteventsp);

  //c(array_pastevents);

  // sumamnos el estimado de cada categoria en total
  let categoriassumas = array_pastevents.reduce(
    (anterior, actual) => {
      const categoriasencontradas = anterior.find((ant) => ant.category == actual.category);
      if(categoriasencontradas){
        categoriasencontradas.assistance += actual.assistance;
        categoriasencontradas.capacity += actual.capacity;
      }else {
        anterior.push({...actual});
      }
  
      return anterior;
    }, []);
   
    let arrayresulta = [];
    categoriassumas.map(evento => {

      c((evento.assistance / evento.capacity * 100).toFixed(2));
  
      tableBodyHTML += `<tr>
       <td>${evento.category}</td>
       <td>$${evento.capacity}</td>
       <td>${(evento.assistance / evento.capacity * 100).toFixed(2)}%</td>
      </tr>`;
  
      //container.innerHTML = tableBodyHTML;
  });
    container.innerHTML = tableBodyHTML;
}

function pastevents(eventos) {
  let arr_cardpast = [];
  let i = 0;

  //c(eventos);
  for (datapast of eventos) {

    //c(datapast.date);

    //Primero patron para solo numeros
    let regex = /(\d+)/g;

    //segundo traemos solo los numeros
    let numeros = datapast.date.match(regex);

    //tercero unimos toda la fecha con solo numeros
    let fecha = numeros.join("");

    //c(fecha+" > "+eventos[0].currentdate);

    if (fecha < currentDateNow(eventos[0].currentdate)) {
      //c("entro una vez al menos...");
      arr_cardpast.push({
        _id: datapast._id,
        image: datapast.image,
        name: datapast.name,
        description: datapast.description,
        category: datapast.category,
        place: datapast.place,
        capacity: datapast.capacity,
        assistance: datapast.assistance,
        price: datapast.price,
        date: datapast.date,
        estimate: datapast.estimate
      });
    }

    //c(datapast.name+"  "+datapast.assistance);
  }
  c(arr_cardpast);
  return arr_cardpast;
}

// ================ CurrentDateNow() ================
function currentDateNow(currentdate) {
  //Primero patron para solo numeros
  //c(currentdate);
  let regex = /(\d+)/g;

  let fechaActual = "";

  //segundo traemos solo los numeros
  let numerosActuales = currentdate.match(regex);

  //tercero unimos toda la fecha con solo numeros
  fechaActual = numerosActuales.join("");
  //c(fechaActual);
  return fechaActual;
}

//esta funcion devolvera solo los eventos que tengan asistencia
function soloConAsistencias(eventos) {
  let temporal = [];
  eventos.forEach((asistencia) => {
    if (!isNaN(asistencia.assistance)) {
      temporal.push({
        capacity: asistencia.capacity,
        assistance: asistencia.assistance,
        name: asistencia.name,
        date: asistencia.date,
        currentdate: asistencia.currentdate
      });
    }
  });

  return temporal;
}




function convertirAPorcentaje(asistencianum) {}