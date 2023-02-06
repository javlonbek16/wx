//modal

let add = document.querySelector(".modal-open");
let modalOpen = document.querySelector(".backdrop");
let cancel = document.querySelector("#cancelbtn");

function showModal() {
  modalOpen.classList.toggle("active");
}

add.addEventListener("click", showModal);
cancel.addEventListener("click", showModal);

// bookmark 

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
    div.innerHTML = `
    <div class="content-item">
    <img src="img/pokemon.png" alt="POKEMON" class="content-img" />
    <h4>Pikachu</h4> 
    <div class="ages-wrapper">
                  <span class="kg">100 kg</span>
                  <span class="age">55 age</span>
                </div>
    <button>
    <img src="img/trash3.svg" alt="HEART" class="heart" />
    </button>
    </div>
    `;
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

//bookmark



// sort 
const sortSelect = document.getElementById("sort");


fetch("https://pokeapi.co/api/v2/pokemon?limit=100")
  .then((response) => response.json())
  .then((data) => {
    const pokemon = data.results;
    console.log(pokemon);
    sortSelect.addEventListener("change", function () {
      const sortBy = this.value;
      pokemon.sort((a, b) => (a[sortBy] > b[sortBy] ? 1 : -1));

      contentUl.innerHTML = "";
      pokemon.forEach((p) => {
        console.log(p);
        const row = document.createElement("div");
        row.innerHTML = `
                <div class="content-item">
             <img src="img/pokemon.png" alt="POKEMON" class="content-img" />
                <img src="img/line.svg" alt="line" class="line" />
                 <div class="content-info-wrapper">
                   <div class="name-wrapper">
                    <h3 class="pokemon-name">${p.name}</h3>
                      </div>
                      <div>
                    <button class="heart_btn" onclick="handelClick(${p.id})">
                      <img src="img/suit-heart.svg" alt="HEART" class="heart" />
                    </button>
                  </div>
                </div>
                <div class="ages-wrapper">
                  <span class="kg">100 kg</span>
                  <span class="age">55 age</span>
                </div>
              </div>
                `;
        contentUl.appendChild(row);
      });
    });
  });
// sort


