let contentUl = document.querySelector(".content");
let searchBtn = document.querySelector(".searchBtn")
searchBtn.addEventListener("click", getData,)

let container = document.querySelector(".container")
function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function lowerCaseName(str) {
  return str.toLowerCase();
}

function getData() {

  const name = document.querySelector("#SearchInput").value;
  const pokemonName = lowerCaseName(name);

  fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      contentUl.innerHTML = `
    <div class="content-item">
          <img src="${data.sprites.other["official-artwork"].front_default}" alt="POKEMON" class="content-img" />
          <div class="content-info-wrapper">
            <div class="name-wrapper">
              <h3 class="pokemon-name">${capitalizeFirstLetter(data.name)}</h3>
              <p class="pokemon-info">${data.types[0].type.name}</p>
            </div>
            <div>
              <button class="heart_btn" onclick="handelClick(${data.id})">
                <img src="img/suit-heart.svg" alt="HEART" class="heart"  />
              </button>
            </div>
          </div>
          <div class="ages-wrapper">
            <span class="kg">${data.weight} kg</span>
            <span class="age">${data.height} height</span>
          </div>
        </div>
    `
    })
    .catch((err) => {
      contentUl.innerHTML =
        `
            <h4>Pokemon not found 😞</h4>
            `;
      console.log("Pokemon not found", err);
    });
};


// fetch("https://pokeapi.co/api/v2/pokemon/").then((res) => res.json()).then((res) => console.log(res))


let base_url = "https://pokeapi.co/api/v2/pokemon/";

const getPokemons = (url) => {
  fetch(url).then(res => res.json())
    .then((res) => {
      renderPokemons(res.results)
    })
}


const renderPokemons = (arr) => {
  arr.map(item => {
    fetch(item.url)
      .then(res => res.json())
      .then((data) => {
        loadCard(data)
      })
  })
}





const loadCard = (data) => {

  let card = document.createElement("ul");
  let content =
    `
    <li class="content-item">
    <img src="${data.sprites.other["official-artwork"].front_default}" alt="POKEMON" class="content-img" />
    <img src="img/line.svg" alt="line" class="line" />
    <div class="content-info-wrapper">
      <div class="name-wrapper">
        <h3 class="pokemon-name">${capitalizeFirstLetter(data.name)}</h3>
        <p class="pokemon-info">${data.types[0].type.name}</p>
      </div>
      <div>
        <button class="heart_btn" onclick="handelClick(${data.id})">
          <img src="img/suit-heart.svg" alt="HEART" class="heart" />
        </button>
      </div>
    </div>
    <div class="ages-wrapper">
      <span class="kg">${data.weight} kg</span>
      <span class="age">${data.height} height</span>
    </div>
  </li>
    `
  card.innerHTML = content;
  contentUl.appendChild(card)
}


getPokemons(`${base_url}?limit=100`);


// sort type
const select = document.getElementById("selectGross");
const limite = 100;
let long,
  i = 0,
  final = limite;


async function obtenerPokemons() {
  try {
    const respuesta = await fetch(
      "https://pokeapi.co/api/v2/pokemon?limit=100&offset=0"
    );
    const objeto = await respuesta.json();
    let res = objeto.result;
    long = res.length;
    for (i; i < final; i++) {
      if (i == long) {
        break;
      } else {
        obtenerInfoPokemon(res[i].url);
      }
    }
  } catch (error) {
    console.error(error);
    console.error("Error");
  }
}


async function obtenerPokemonsPorTipo() {
  try {
    const respuest = await fetch(
      `https://pokeapi.co/api/v2/type/${select.value}`
    );
    const objet = await respuest.json();
    let resultado = objet.pokemon;
    long = resultado.length;
    for (i; i < final; i++) {
      if (i == long) {
        break;
      } else {
        obtenerInfoPokemon(resultado[i].pokemon.url);
      }
    }
  } catch (error) {
    console.error(error);
    console.error("Error  Pokemons ");
  }
}

async function obtenerInfoPokemon(url) {
  contentUl.innerHTML = "";
  try {
    const respuesta = await fetch(url);
    const objeto = await respuesta.json();
    crearCard(objeto);
  } catch (error) {
    console.error(error);
    console.error("Error");
  }
}


function crearCard(objeto) {
  let type = "";
  objeto.types.forEach((e) => {
    type += `<span class="type type-${e.type.name}">  ${e.type.name}</span>`;
  });


  let img = objeto.sprites.other.home.front_default;
  if (img == null) {
    img = "https://cdn-icons-png.flaticon.com/512/42/42901.png";
  }

  let card = `
   <div class="content-item">
  <img src="${img}" alt="POKEMON" class="content-img" />
  <div class="content-info-wrapper">
    <div class="name-wrapper">
      <h3 class="pokemon-name">${capitalizeFirstLetter(objeto.name[0].toUpperCase() + objeto.name.substring(1))}</h3>
      <p class="pokemon-info">${type}</p>
    </div>
    <div>
      <button class="heart_btn" onclick="handelClick(${objeto.id})">
        <img src="img/suit-heart.svg" alt="HEART" class="heart" />
      </button>
    </div>
  </div>
  <div class="ages-wrapper">
    <span class="kg">${objeto.weight} kg</span>
    <span class="age">${objeto.height} height</span>
  </div>
  </div>
  `;

  contentUl.innerHTML += card;
}


async function cargarCombo() {
  try {
    const respuesta = await fetch("https://pokeapi.co/api/v2/type");
    const objeto = await respuesta.json();
    const resultado = objeto.results;
    let options = "";
    for (let i = 0; i < resultado.length - 2; i++) {
      options += `
              <option value=${i + 1}>${resultado[i].name}</option>
          `;
    }
    select.innerHTML += options;
  } catch (error) {
    console.error(error);
    console.error("Error  Combo");
  }
}

select.addEventListener("change", () => {
  final = limite;
  i = 0;
  obtenerPokemonsPorTipo();
  scroll(0, 0);
});
