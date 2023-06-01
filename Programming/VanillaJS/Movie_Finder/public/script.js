const tmdbKey = '597849da9b3755cfedf0806efef27124';
const tmdbBaseUrl = 'https://api.themoviedb.org/3';
const playBtn = document.getElementById('playBtn');

const getGenres = async () => {
  const genreRequestEndpoint = '/genre/movie/list';
  const requestParams = '?api_key=' + tmdbKey;
  const urlToFetch = tmdbBaseUrl + genreRequestEndpoint + requestParams;
  console.log(urlToFetch);
  try {
    const response = await fetch(urlToFetch);
    if (response.ok) {
      const jsonResponse = await response.json();
      // console.log(jsonResponse);
      const genres = jsonResponse.genres;
      return genres;
    }
  } catch (error) {
    console.log(error);
  }
};

const getMovies = async () => {
  const selectedGenre = '&with_genres=' + getSelectedGenre();
  const discoverMovieEndpoint = '/discover/movie';
  const requestParams = '?api_key=' + tmdbKey + selectedGenre;
  const urlToFetch = tmdbBaseUrl + discoverMovieEndpoint + requestParams;
  console.log(urlToFetch);
  try {
    const response = await fetch(urlToFetch);
    if (response.ok) {
      const jsonResponse = await response.json();
      console.log(jsonResponse);
      let movies = await jsonResponse.results;
      console.log(movies);
      return movies;
    }
  } catch (Error) {
    console.log(error);
  }
};

const getMovieInfo = async (movie) => {
  const movieId = movie.id;
  const movieEndpoint = `/movie/${movieId}`;
  const requestParams = `?api_key=${tmdbKey}`;
  const urlToFetch = tmdbBaseUrl + movieEndpoint + requestParams;
  try {
    const response = await fetch(urlToFetch);
    if (response.ok) {
      const jsonResponse = await response.json();
      console.log(jsonResponse);
      const movieInfo = jsonResponse;
      return movieInfo;
    }
  } catch (Error) {
    console.log(error);
  }
};

// Gets a list of movies and ultimately displays the info of a random movie from the list
const showRandomMovie = async () => {
  const movieInfo = document.getElementById('movieInfo');
  if (movieInfo.childNodes.length > 0) {
    clearCurrentMovie();
  }
  const movies = await getMovies();
  console.log(movies);
  const randomMovie = await getRandomMovie(movies);
  console.log(randomMovie);
  const info = await getMovieInfo(randomMovie);
  console.log(info);
  displayMovie(info);
};

getGenres().then(populateGenreDropdown);
playBtn.addEventListener('click', showRandomMovie);
