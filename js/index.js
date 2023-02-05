let contentUl = document.querySelector(".content");
// let url = `https://pokeapi.co/api/v2/pokemon`;
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

  fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      contentUl.innerHTML = `
    <li class="content-item">
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
        </li>
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


// fetch("https://pokeapi.co/api/v2/pokemon/1/").then((res) => res.json()).then((res) => console.log(res))

let perPage = 40;

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
  card.classList.add("list")

  let content = `
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


//bookmark

let leftWrapper = document.querySelector(".left-wrapper")
let cartItems = document.createElement("div");
leftWrapper.appendChild(cartItems);

let savedPosts = JSON.parse(localStorage.getItem("savedPosts")) || [];

function handelClick(post) {
  if (!savedPosts.includes(post)) {
    savedPosts.push(post);
    renderPosts(savedPosts, cartItems);
    saveToLocal();
  } else {
    alert("Allaqachon qo'shilgan");
  }
}
function saveToLocal() {
  localStorage.setItem("savedPosts", JSON.stringify(savedPosts));
}


let cartCount = document.querySelector(".cartCount")
function renderPosts(array, parent) {
  parent.innerHTML = "";

  array.forEach((post) => {
    let div = document.createElement("div");
    div.className = "cart-post";
    div.innerHTML = `<h4>${post.title}</h4> <button>Remove</button>`;
    parent.appendChild(div);

    let removeBtn = div.querySelector("button");
    removeBtn.onclick = () => handleRemove(post);
  });

  cartCount.textContent = savedPosts.length;
}



function handleRemove(data) {
  let filtered = savedPosts.filter((item) => item.id !== data.id);

  savedPosts = filtered;
  renderPosts(savedPosts, cartItems);
  saveToLocal();
}



const select = document.getElementById("selectGross");
const limite = 9;
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
    // console.log(long);
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
    type += `<span class="type type-${e.type.name}">${e.type.name}</span>`;
  });

  let stat = "";
  for (let i = 0; i < objeto.stats.length; i++) {
    stat += `
          <span class="stat">
              ${objeto.stats[i].stat.name[0].toUpperCase() +
      objeto.stats[i].stat.name.substring(1)
      }
              : ${objeto.stats[i].base_stat}
          </span>
      `;
  }

  let img = objeto.sprites.other.home.front_default;
  if (img == null) {
    img = "https://cdn-icons-png.flaticon.com/512/42/42901.png";
  }

  let card = `
      <div class="card">
          <div class="card-header" 
          style="background-color:${[objeto.types[0].type.name]}">
              <span class="header-title">
                  ${objeto.name[0].toUpperCase() + objeto.name.substring(1)}
              </span>
              <div class="header-img">
                  <img class="img" 
                  src=${img} />
              </div>
          </div>
          <div class="card-info">
              <div class="info-types">
                  ${type}
              </div>
              <div class="info-stats">
           
              </div>
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












