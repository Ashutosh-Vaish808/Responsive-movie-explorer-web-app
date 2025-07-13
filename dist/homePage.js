"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let posters;
posters = document.createElement('div');
posters.classList.add('posters');
document.body.appendChild(posters);
const date = new Date();
const today = date.toISOString().split('T')[0];
const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhZmRlMWI1MGMwMjM1NGI0Zjc0NTQxYjE5MTU5OGZiYiIsIm5iZiI6MTczODc1MDQzMC42NDQsInN1YiI6IjY3YTMzOWRlN2M4NjA5NjAyOThhNzNmNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.iWRPjrvI0c2fObNae797CFdtzHDNfgBisTp0WLASj6I'
    }
};
function fetchData() {
    return __awaiter(this, arguments, void 0, function* (pageNum = 1, date = today) {
        try {
            const response = yield fetch(`https://api.themoviedb.org/3/discover/movie?sort_by=release_date.desc&page=${pageNum}&release_date.lte=${date}`, options);
            if (!response.ok) {
                throw new Error('hehe nhi mila');
            }
            else {
                const data = yield response.json();
                let movies = data.results;
                renderHomePage(movies);
                createPageButtons(pageNum);
                return movies;
            }
        }
        catch (error) {
            console.error(error, "error");
        }
    });
}
fetchData(1, today);
function renderHomePage(movies) {
    let accumilator = '';
    for (let i = 0; i < movies.length; i++) {
        if (movies[i].poster_path === null) {
            continue;
        }
        let rating = Math.round(movies[i].vote_average);
        let html = `
      <button id="js-movies" class="movie" onmouseover="classList.add('mouse_over')" onmouseout="classList.remove('mouse_over')" >

      <img class="poster" src='https://image.tmdb.org/t/p/w500/${movies[i].poster_path}'>

      <div class="title">
            ${movies[i].title}
      </div>

      <div class="rating">
            Rating : ${rating}/10 ( ${movies[i].vote_count}👤)
      </div>

      <div class="release_date">
            Date :  ${movies[i].release_date}
      </div>

      <div class="fakeButton">
            View
      </div>

      </button>
    `;
        accumilator = accumilator + html;
        posters.innerHTML = accumilator;
    }
}
const pageButtons = document.createElement('div');
document.body.appendChild(pageButtons);
pageButtons.classList.add('page_buttons');
function createPageButtons(pageNum) {
    let html = `<button class="previous_page" 
      onclick="if(${pageNum}>1){
        pageNum=${pageNum}-1;
        fetchData(pageNum);
        document.documentElement.scrollTop=0
      }">

          hehe
      
      </button>
      <div class="page_num">
          Page no:${pageNum}
      </div>
      <button class="next_page"
        onclick="
          pageNum=${pageNum}+1
          fetchData(pageNum);
          document.documentElement.scrollTop=0
      ">
        Next
      </button>  `;
    pageButtons.innerHTML = html;
}
let searchBar = document.getElementById('searchBar');
searchBar === null || searchBar === void 0 ? void 0 : searchBar.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        searchMovie(searchBar.value);
    }
});
let searchButton = document.getElementById('searchButton');
searchButton === null || searchButton === void 0 ? void 0 : searchButton.addEventListener('click', () => searchMovie(searchBar.value));
function searchMovie(text) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(`https://api.themoviedb.org/3/search/movie?query=${text}`, options);
            if (!response.ok) {
                throw new Error('hehe nhi mila');
            }
            else {
                const data = yield response.json();
                const result = data.results;
                renderHomePage(result);
            }
        }
        catch (error) {
            console.log(error, "errior");
        }
    });
}
