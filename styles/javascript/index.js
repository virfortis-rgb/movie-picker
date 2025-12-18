const omdbapiUrl = "http://www.omdbapi.com/";
const apiKey = "709ff2f7";
// const url = `${omdbapiUrl}?S=${movieInput}&apikey=${apiKey}`

// const template = document.querySelector("movieCardTemplate");
// const clone = template.content.cloneNode(true);

// const movieCardsContainer = document.querySlector(".container-cards-movies");

// const displayMovies = (movies) => {
//   movieCardsContainer.forEach((movie) => {
//     movieCardsContainer.insertAdjacentHTML("beforeend", clone)
//   })
// };

const submit = (event) => {
  // event.preventDefault();
  // const movieInput = document
  // fetch(url)
  //   .then(response => response.json())
  //   .then(data => displayMovies(data.Search));
  console.log("Hello from submit");
};

const form = document.querySelector("#submit");
form.addEventListener("click", submit)
