let content = document.querySelector(".content");
let add = document.querySelector(".add");
let deleteIn = document.querySelector(".delete");
let edit = document.querySelector(".edit");

let url = ``;
function getData() {
    fetch(url,
    )
        .then((response) => response.json())
        .then((response) => {
            console.log(response);
        })
        .catch((err) => {
            console.log(err);
        })
};

getData()