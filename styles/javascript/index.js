// Get input from user
const genreInput = document.querySelector("#select-genre");
const moviesInput = document.querySelector("#checkMovies");
const seriesInput = document.querySelector("#checkSeries");
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
    url = `https://api.themoviedb.org/3/discover/movie?include_adult=false&language=en-US&page=1&region=South%20Africa&sort_by=popularity.desc&with_genres=${genre}&with_original_language=en`;
  } else if(seriesBoolean === true){
    url = `https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=${genre}&with_original_language=en`;
  } else {
    url = `https://api.themoviedb.org/3/discover/movie?include_adult=false&language=en-US&page=1&region=South%20Africa&sort_by=popularity.desc&with_genres=${genre}&with_original_language=en`;
  }
  return url;
};

// fetch('https://api.themoviedb.org/3/genre/tv/list?language=en', options)
//   .then(res => res.json())
//   .then(res => console.log(res))
//   .catch(err => console.error(err));

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
    cloneCard.querySelector(".main-card-text").innerText = movie.overview;
    cloneCard.querySelector("#main-card-img").src = `https://image.tmdb.org/t/p/original/${movie.poster_path}`;
    movieCardContainer.appendChild(cloneCard);
};

const displayMovies = (movies) => {
  movies.forEach((movie) => {
    const cloneCards = templateCards.content.cloneNode(true);
    cloneCards.querySelector(".card-title").innerText = movie.title;
    cloneCards.querySelector(".card-text").innerText = movie.overview;
    cloneCards.querySelector("#cards-img").src = `https://image.tmdb.org/t/p/original/${movie.poster_path}`;
    movieCardsContainer.appendChild(cloneCards);
  })
};

// Event Listener
const submit = (event) => {
  event.preventDefault();
  movieCardsContainer.innerHTML = "";
  movieCardContainer.innerHTML = "";
  console.log(`You selected genre: ${genreInput.value} and movies: ${moviesInput.checked} and series: ${seriesInput.checked}`)
  url = urlInput(moviesInput.checked, seriesInput.checked, genreInput.value)
  fetch(url, options)
  .then(response => response.json())
  .then((data) => {
    console.log(data);
    document.querySelector("#container-results").classList.remove("d-none");
    displayMainMovie(data.results);
    displayMovies(data.results);
  })
  .catch(err => console.error(err));
};

const form = document.querySelector("#submit");
form.addEventListener("click", submit)
