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
                    <button class="heart_btn">
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


