
let add = document.querySelector(".modal-open");
let modalOpen = document.querySelector(".backdrop");
let cancel = document.querySelector("#cancelbtn");

function showModal() {
    modalOpen.classList.toggle("active");
}

add.addEventListener("click", showModal);
cancel.addEventListener("click", showModal);