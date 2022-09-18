import movieData from "../movieStore.js";

// creation and initialization of variables
const submitBtn = document.getElementById("submit-btn");
const iClose = document.getElementById("close");
const addSection = document.getElementById("show-card");
const movieForm = document.getElementById("movie-form");
const searchBtn = document.getElementById("search-btn");
const cancelBtn = document.getElementById("cancel-btn-id");
const search = document.getElementById("search-section");
const addBtn = document.getElementById("add-btn");
const ul = document.getElementById("under-list");
const MovieArray = Object.values(movieData);
const MovieNames = Object.keys(movieData);

// function that handles displaying of movies on the webpage
const displayMovies = (
  { cast, plot, rating, runtime, year },
  title,
  span = ""
) => {
  let ul = document.getElementById("under-list");
  let section = document.getElementById("show-list");

  let h1Title = document.createElement("h1");
  let pCast = document.createElement("p");
  let pPlot = document.createElement("p");
  let pRating = document.createElement("p");
  let pRuntime = document.createElement("p");
  let pYear = document.createElement("p");
  let li = document.createElement("li");

  h1Title.innerHTML = title;
  pCast.innerHTML = "Cast:" + cast.map((value) => " " + value);
  pPlot.innerHTML = "Plot: " + plot;
  pRating.innerHTML = "Rating: " + rating;
  pRuntime.innerHTML = "Runtime: " + runtime;
  pYear.innerHTML = "Year: " + year;

  li.appendChild(h1Title);
  li.appendChild(pCast);
  li.appendChild(pPlot);
  li.appendChild(pRating);
  li.appendChild(pRuntime);
  li.appendChild(pYear);

  li.classList.add("movie-list-li");

  if (section.contains(ul)) {
    ul.appendChild(li);
  } else {
    if (
      title !== "" &&
      plot !== "" &&
      cast !== "" &&
      runtime !== "" &&
      rating !== "" &&
      year !== ""
    ) {
      span.appendChild(li);
      section.appendChild(span);
    }
  }
};

// function that handles user inputs on their favorite movies
submitBtn.addEventListener("click", (event) => {
  event.preventDefault();
  const ul = document.createElement("ul");
  ul.setAttribute("id", "delete-ul");

  const title = document.getElementById("name").value;
  const cast = document.getElementById("cast").value;
  const plot = document.getElementById("plot").value;
  const rating = document.getElementById("rating").value;
  const runtime = document.getElementById("runtime").value;
  const year = document.getElementById("year").value;

  const singleMovie = {
    plot: plot,
    cast: cast.split(","),
    runtime: runtime,
    rating: rating,
    year: year,
  };

  const mission = {};

  mission[title] = singleMovie;

  movieData[title] = mission[title];

  const MovieArray = Object.values(movieData);
  const MovieNames = Object.keys(movieData);

  const oldUl = document.getElementById("under-list");
  const section = document.getElementById("show-list");

  if (section.contains(oldUl)) {
    oldUl.remove();
  } else {
    const section = document.getElementById("delete-ul");
    section.remove();
  }

  MovieArray.map((value, key) => {
    displayMovies(value, MovieNames[key], ul);
  });

  movieForm.reset();
});

// iterating through the movie object
MovieArray.map((value, key) => {
  displayMovies(value, MovieNames[key]);
});

// function that handles closing of movie form
iClose.addEventListener("click", () => {
  addSection.classList.remove("show");
  addSection.classList.add("none");
  ul.classList.remove("none");
});

// function that handles closing of search form
cancelBtn.addEventListener("click", () => {
  search.classList.remove("show");
  search.classList.add("none");
  // ul.classList.remove("none");
});

// function that handles opening movie form
addBtn.addEventListener("click", () => {
  addSection.classList.remove("none");
  addSection.classList.add("show");
  search.classList.remove("show");
  search.classList.add("none");

  ul.classList.add("none");
});

// function that transforms first letter of every words in a string
const capitalizeFirstWord = (value) => {
  value = value.split(" ");

  for (var i = 0, x = value.length; i < x; i++) {
    value[i] = value[i][0].toUpperCase() + value[i].substr(1);
  }

  return value.join(" ");
};

// search functionality
searchBtn.addEventListener("click", (event) => {
  event.preventDefault();

  const searchValue = document.getElementById("search-value");
  const searchSection = document.getElementById("search-section");
  const div = document.createElement("div");
  const h1 = document.createElement("h1");
  const p = document.createElement("p");
  const divInfo = document.createElement("div");

  divInfo.classList.add("info");
  div.classList.add("sign");

  div.classList.add("result-class");
  h1.classList.add("search-header");
  p.classList.add("search-para");

  addSection.classList.remove("show");
  addSection.classList.add("none");

  let valueTransform;

  if (searchValue.value !== "") {
    console.log("Hello");
    valueTransform = capitalizeFirstWord(searchValue.value.trim());
  }

  if (movieData[valueTransform]) {
    const elements = document.getElementsByClassName("info");
    const oldElements = document.getElementsByClassName("sign");
    const arr = Array.prototype.slice.call(elements);
    const arrOld = Array.prototype.slice.call(oldElements);
    arrOld.map((value) => value.remove());
    arr.map((value) => value.remove());
    console.log(arr);
    h1.innerHTML = valueTransform;
    p.innerText = "Year of publication: " + movieData[valueTransform].year;
    div.appendChild(h1);
    div.appendChild(p);
    searchSection.appendChild(div);
  } else {
    const elements = document.getElementsByClassName("sign");
    const elementsInfo = document.getElementsByClassName("info");
    const arr = Array.prototype.slice.call(elements);
    const arrInfo = Array.prototype.slice.call(elementsInfo);
    arr.map((value) => value.remove());
    arrInfo.map((value) => value.remove());
    h1.innerHTML = "Movie not found in our movies store check later";
    p.innerText = "Your can add movies to our store using the add movie button";
    divInfo.appendChild(h1);
    divInfo.appendChild(p);
    searchSection.classList.add("show");
    searchSection.classList.remove("none");
    ul.classList.remove("none");
    ul.classList.add("show");
    searchSection.appendChild(divInfo);
  }
});
