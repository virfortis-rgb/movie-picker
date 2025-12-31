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
// const coreGenres = [
//   {
//     "id": 28,
//     "name": "Action"
//   },
//   {
//     "id": 12,
//     "name": "Adventure"
//   },
//   {
//     "id": 16,
//     "name": "Animation"
//   },
//   {
//     "id": 35,
//     "name": "Comedy"
//   },
//   {
//     "id": 80,
//     "name": "Crime"
//   },
//   {
//     "id": 99,
//     "name": "Documentary"
//   },
//   {
//     "id": 18,
//     "name": "Drama"
//   },
//   {
//     "id": 10751,
//     "name": "Family"
//   },
//   {
//     "id": 14,
//     "name": "Fantasy"
//   },
//   {
//     "id": 36,
//     "name": "History"
//   },
//   {
//     "id": 27,
//     "name": "Horror"
//   },
//   {
//     "id": 10402,
//     "name": "Music"
//   },
//   {
//     "id": 9648,
//     "name": "Mystery"
//   },
//   {
//     "id": 10749,
//     "name": "Romance"
//   },
//   {
//     "id": 878,
//     "name": "Science Fiction"
//   },
//   {
//     "id": 10770,
//     "name": "TV Movie"
//   },
//   {
//     "id": 53,
//     "name": "Thriller"
//   },
//   {
//     "id": 10752,
//     "name": "War"
//   },
//   {
//     "id": 37,
//     "name": "Western"
//   }
// ]

// Get input from user

const genreInput = document.querySelector("#select-genre");
const moviesInput = document.querySelector("#checkMovies");
const seriesInput = document.querySelector("#checkSeries");
// let moviesOrSeries = "";
let url = "";

// API 1
// const omdbapiUrl = "http://www.omdbapi.com/";
// const omdbapiKey = "709ff2f7";
// const omdbUrl = `${omdbapiUrl}?S=${moviesOrSeries}&apikey=${omdbapiKey}`

// API 2
const tmbbapiKey = "fcc88ec7ca39184c4e52b6ac9d73e301";
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmY2M4OGVjN2NhMzkxODRjNGU1MmI2YWM5ZDczZTMwMSIsIm5iZiI6MTc2NzA2NjQ2OC40Niwic3ViIjoiNjk1MzRiNjQ4OGM4ZjYwZTlmODkwMTNjIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.LhDUMSqHRNjKipLm4Og0h266suKV61dNp1M-bGbyazM'
  }
};
const urlInput = (moviesBoolean, seriesBoolean, genre) => {
  if(moviesBoolean === true) {
    // moviesOrSeries = "movie";
    url = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&region=South%20Africa&sort_by=popularity.desc&with_genres=${genre}`;
  } else if(seriesBoolean === true){
    // moviesOrSeries = "tv";
    url = `https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=${genre}`;
  }
  return url;
};

const dropDown = document.querySelector("#select-genre");
addEventListener("load", (event) => {
  fetch('https://api.themoviedb.org/3/genre/movie/list?language=en', options)
    .then(response => response.json())
    .then((data) => {let coreGenres = data.genres
      coreGenres.forEach((genre) => {
        dropDown.insertAdjacentHTML("beforeend", `<option value="${genre.id}">${genre.name}</option>`);
      });
    })
    .catch(err => console.error(err));
})

// Display results to user
const templateCards = document.querySelector("#movie-cards-template");
const movieCardsContainer = document.querySelector(".container-cards-movies");
const templateCard = document.querySelector("#movie-card-template");
const movieCardContainer = document.querySelector("#container-main-card");

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

// Event Listener

const submit = (event) => {
  event.preventDefault();
  movieCardsContainer.innerHTML = "";
  movieCardContainer.innerHTML = "";
  console.log(`You selected genre: ${genreInput.value} and movies: ${moviesInput.checked} and series: ${seriesInput.checked}`)
  fetch(urlInput(moviesInput.checked, seriesInput.checked, genreInput.value), options)
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(err => console.error(err));
  document.querySelector("#container-results").classList.remove("d-none");
  displayMovies(movies);
  displayMainMovie(movies);
};

const form = document.querySelector("#submit");
form.addEventListener("click", submit)
