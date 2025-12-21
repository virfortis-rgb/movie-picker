const omdbapiUrl = "http://www.omdbapi.com/";
const apiKey = "709ff2f7";
// const url = `${omdbapiUrl}?S=${movieInput}&apikey=${apiKey}`

const templateCards = document.querySelector("#movie-cards-template");
const movieCardsContainer = document.querySelector(".container-cards-movies");
const templateCard = document.querySelector("#movie-card-template");
const movieCardContainer = document.querySelector("#container-main-card");
const movies = [
  {
    title: "KPop Demon Hunters",
    description: "Animated action musical where a K-pop girl group doubles as demon hunters defending humanity while chasing chart success." // Based on popularity and plot summary :contentReference[oaicite:1]{index=1}
  },
  {
    title: "Damsel",
    description: "Fantasy adventure starring Millie Bobby Brown as a bride-to-be who must battle a dragon and save herself in a medieval world." // From most watched list :contentReference[oaicite:2]{index=2}
  },
  {
    title: "Red Notice",
    description: "Action comedy with an FBI profiler teaming with a notorious art thief to catch criminals and recover a priceless artifact." // From most watched list :contentReference[oaicite:3]{index=3}
  },
  {
    title: "The Gray Man",
    description: "Action thriller about a former CIA operative on the run after uncovering agency secrets, triggering a global manhunt." // From most watched list :contentReference[oaicite:4]{index=4}
  },
  {
    title: "Nonnas",
    description: "Family dramedy centered on food, life transitions, and relationships as characters navigate personal challenges." // Recently popular on Netflix :contentReference[oaicite:5]{index=5}
  },
  {
    title: "Shrek",
    description: "Beloved animated comedy following an ogre’s quest to rescue Princess Fiona in a fairy-tale land full of oddball characters." // Streaming on Netflix and in top lists :contentReference[oaicite:6]{index=6}
  },
  {
    title: "Ice Road: Vengeance",
    description: "Action thriller featuring Liam Neeson in a high-stakes survival and revenge story on treacherous ice roads." // Listed in current popular movies :contentReference[oaicite:7]{index=7}
  },
  {
    title: "Ruth & Boaz",
    description: "Modern romantic drama about love, life, and personal growth set against the backdrop of rural life and vineyard culture." // From popular list :contentReference[oaicite:8]{index=8}
  },
  {
    title: "28 Years Later",
    description: "Post-apocalyptic horror sequel continuing the intense zombie survival saga decades after the original outbreak." // From popular list :contentReference[oaicite:9]{index=9}
  },
  {
    title: "The Wrong Paris",
    description: "Romantic comedy about a small-town girl chasing her dreams and finding unexpected love while filming a reality show." // From popular list :contentReference[oaicite:10]{index=10}
  }
];

const displayMainMovie = (movies) => {
    const movie = movies[0];
    const cloneCard = templateCard.content.cloneNode(true);
    cloneCard.querySelector(".main-card-title").innerText = movie.title;
    cloneCard.querySelector(".main-card-text").innerText = movie.description;
    movieCardContainer.appendChild(cloneCard);
};

const displayMovies = (movies) => {
  movies.forEach((movie) => {
    const cloneCards = templateCards.content.cloneNode(true);
    cloneCards.querySelector(".card-title").innerText = movie.title;
    cloneCards.querySelector(".card-text").innerText = movie.description;
    movieCardsContainer.appendChild(cloneCards);
  })
};

const submit = (event) => {
  event.preventDefault();
  movieCardsContainer.innerHTML = "";
  movieCardContainer.innerHTML = "";
  // const movieInput = document
  // fetch(url)
  //   .then(response => response.json())
  //   .then(data => displayMovies(data.Search));
  console.log("Hello from submit");
  document.querySelector("#container-results").classList.remove("d-none");
  displayMovies(movies);
  displayMainMovie(movies);
};

const form = document.querySelector("#submit");
form.addEventListener("click", submit)

// *************************************************************
// Add genres to drop-down

const coreGenres = [
  "Action",
  "Adventure",
  "Comedy",
  "Drama",
  "Horror",
  "Thriller",
  "Romance",
  "Science Fiction",
  "Fantasy",
  "Mystery",
  "Crime",
  "Documentary",
  "Animation",
  "Anything is cool"
];

const dropDown = document.querySelector("#select-genre");
let value = 1;
coreGenres.forEach((genre) => {
  dropDown.insertAdjacentHTML("beforeend", `<option value="${value}">${genre}</option>`);
  value += 1;
});
