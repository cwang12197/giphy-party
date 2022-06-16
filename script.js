const API_KEY = "KdV88g3E15so7dWCPOAbJQ8bnSGXRo4E&q=";
const API_FRONT = "http://api.giphy.com/v1/gifs/search?api_key=";
const API_URL = API_FRONT + API_KEY ;
const limit = 9;
const pages = 1;
const offset = pages * limit;
const rating = "g";

const searchBarEl = document.querySelector("#search-bar");
const submitButton = document.querySelector("#submit-button");
const gifContainer = document.querySelector("#gif-container"); //clear this after search
const searchInput = document.querySelector("#search");


async function getResults() {
    console.log(searchInput.value);
    const url = `${API_URL}${searchInput.value}${rating}`
    const response = await fetch(url); //fetch the url with the search
    const results = await response.json();
    const resultData = results.data;
    for (let i = 0; i < offset; i++) 
    resultData.forEach(result => {
    displayResults(result);
   })
}

function displayResults(data) {
    console.log(data.images.original.url);
        gifContainer.innerHTML += `
        <img id = "gifs" src = ${data.images.original.url} alt = "gif">
        `
}

searchBarEl.addEventListener('submit', event => {
    event.preventDefault();
    getResults();
});



