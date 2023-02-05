let contentUl = document.querySelector(".content");
let url = `https://pokeapi.co/api/v2/pokemon`;
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



// function () {

// }


// let sort = document.querySelector("#sort")
// sort.addEventListener('change', (e) => {
//   const sortedData = (readUsers()).sort((a, b) => {
//     if (e.target.value === 'sortA') {
//       return a.name.toLowerCase()[0] > b.name.toLowerCase()[0] ? 1 : -1
//     }
//     if (e.target.value === 'sortZ') {
//       return b.name.toLowerCase()[0] > a.name.toLowerCase()[0] ? 1 : -1
//     }
//   })
//   loadCard(sortedData)
// })





// function sortList() {

// }



// function readUsers() {
//   try {
//     const response = fetch(url)
//     const body = response.json()
//     return body
//   } catch (error) {
//     errorMessage(error.message)
//   }
// }



//bookmark





