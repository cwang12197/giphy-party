const API_KEY = "KdV88g3E15so7dWCPOAbJQ8bnSGXRo4E&q=";
const API_FRONT = "http://api.giphy.com/v1/gifs/search?api_key=";
const API_URL = API_FRONT + API_KEY ;
const limit = 9;
const rating = "g";

const searchBarEl = document.querySelector("#search-bar");
const submitButton = document.querySelector("#submit-button");
const gifContainer = document.querySelector("#gif-container"); //clear this after search
const searchInput = document.querySelector("#search");
const loadMoreGifs = document.querySelector("#load-more");

var pages = 0;
var offset = pages * limit;

let searchTerm = "";

async function getResults(searchTerm, offset) {
    console.log(searchTerm);
    const url = `${API_URL}${searchTerm}&limit=${limit}&rating=${rating}&offset=${offset}`;
    const response = await fetch(url); //fetch the url with the search
    const results = await response.json();
    const resultData = results.data;
    resultData.forEach(result => {
    displayResults(result);
   })
}

function displayResults(data) {
    //console.log(data.images.original.url);
        gifContainer.innerHTML += `
        <img id = "" src = ${data.images.original.url} alt = "${data.title}">
        `
}

searchBarEl.addEventListener('submit', event => {
    event.preventDefault();
   // remove hidden element
   loadMoreGifs.classList.remove("hidden");
   
   //clear gifResults
   gifContainer.innerHTML = "";
    pages = 0;
    searchTerm = searchInput.value;
    console.log(searchTerm);
   getResults(searchTerm, (pages++)*limit);
   //searchInput.value = " "; //reset search

});

loadMoreGifs.addEventListener('click', event => {
    offset = (pages++)*limit;
    console.log("after loading new pages: ", searchTerm);
    getResults(searchTerm, offset);
    searchInput.value = " ";
});





