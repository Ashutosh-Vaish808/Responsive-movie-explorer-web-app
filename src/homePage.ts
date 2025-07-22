


let posters:HTMLDivElement
  posters=document.createElement('div');
  posters.classList.add('posters')
  document.body.appendChild(posters)

const date=new Date();
const today=date.toISOString().split('T')[0];


const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhZmRlMWI1MGMwMjM1NGI0Zjc0NTQxYjE5MTU5OGZiYiIsIm5iZiI6MTczODc1MDQzMC42NDQsInN1YiI6IjY3YTMzOWRlN2M4NjA5NjAyOThhNzNmNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.iWRPjrvI0c2fObNae797CFdtzHDNfgBisTp0WLASj6I'
  }
};
let fechch=async function fetchData(pageNum:number=1,date:string=today){
  try{
    const response=await fetch(`https://api.themoviedb.org/3/discover/movie?sort_by=release_date.desc&page=${pageNum}&release_date.lte=${date}`, options)
    if(!response.ok){
      throw new Error('hehe nhi mila')
    }
    else{
 
      const data=await response.json();
      
      let movies=data.results
      renderHomePage(movies)
      createPageButtons(pageNum,fechch)
      return movies;
      
    }
  }
  catch(error){console.error(error,"error")}
}
fechch(1,today)

function renderHomePage(movies:any,){
  let accumilator=''
  for(let i=0;i<movies.length;i++){
    
    
    if(movies[i].poster_path===null){
      continue;
    }
    
    let rating =Math.round(movies[i].vote_average)
    
    let html=`
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
    `
    accumilator=accumilator+html;
  
  
  posters.innerHTML=accumilator
}  
}


const pageButtons=document.createElement('div')
document.body.appendChild(pageButtons)
pageButtons.classList.add('page_buttons')

function createPageButtons(pageNum:number,fetch:Function ) 
{
      let html=
      `<button class="previous_page" 
      onclick="if(${pageNum}>1){
        pageNum=${pageNum}-1;
        fetch(pageNum);
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
          fetch(pageNum);
          document.documentElement.scrollTop=0
      ">
        Next
      </button>  `
  
  pageButtons.innerHTML=html
}
let searchBar=document.getElementById('searchBar')as HTMLInputElement
searchBar?.addEventListener('keydown',(event)=>{
  if(event.key==='Enter'){
    searchMovie(searchBar.value)
  }
})

let searchButton=document.getElementById('searchButton')
searchButton?.addEventListener('click',()=>searchMovie(searchBar.value))

async function searchMovie(text:string){
    try{

        const response=await fetch(`https://api.themoviedb.org/3/search/movie?query=${text}`,options)
        if(!response.ok){
          throw new Error('hehe nhi mila')
        }
        else{
          const data=await response.json()
          const result=data.results
          renderHomePage(result)
        }
      
    }
    catch(error){console.log(error,"errior")}
}

