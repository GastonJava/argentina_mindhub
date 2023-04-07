let c = console.log;

const queryString = location.search;

const params = new URLSearchParams(queryString);

const id = params.get("id");

c("id: " + id);

c("todas las cards: " + data.currentDate);

const categorias = data.events.find((categoria) => categoria._id == id);

c(JSON.stringify(categorias));

c(categorias._id);

let container = document.querySelector(".main-container__details");

let plantillaDetalles = "";

function Detalles() {
    plantillaDetalles += `
    <div class="imagen-detail">
        <img src="${categorias.image}" alt="imagen">
    </div>

    <div class="texto-detail">
        <div class="textos">
            <h1>${categorias.name}</h1>
            <p>${categorias.description}</p>
        </div>
    </div>
    `;

    container.innerHTML = plantillaDetalles;
}

Detalles();