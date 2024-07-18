const APIURL = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";
const IMGPATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI = "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

const movieBox = document.querySelector(".content");


async function getMovies(url) {
    try{
        const movies = await fetchMovies(url);
       showMovies(movies);
    }
    catch(error){
        alert(error)
    }
}

async function fetchMovies(url) {
    const response = await fetch(url);
    if(!response.ok){
        throw new Error("Could Not fetch Movie Data")
    }

    const data = await response.json();
    return data.results;
}

function showMovies(movies) {
    let html = "";
    movies.map(movie => {
        html += `
            <div class="box">
                <img src="${IMGPATH}${movie.poster_path}" alt="${movie.title}">
                <h3>${movie.title}</h3>
                <p>${movie.overview}</p>
            </div>
        `;
    });
    movieBox.innerHTML = html;
}

getMovies(APIURL);


const search = document.querySelector("#search")

search.addEventListener("keyup", (event)=>{
    if(event.target.value != ""){
        getMovies(SEARCHAPI + event.target.value)
    }
    else{
        getMovies(APIURL)
    }
})