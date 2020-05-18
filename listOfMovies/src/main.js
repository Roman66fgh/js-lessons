const posterURL = 'http://www.omdbapi.com/?apikey=aef9b051';

const Movie = document.querySelector('#Movie')
Movie.addEventListener('submit', addPosterFilterInURL);

const movies = document.querySelector('#movies');
const load = document.querySelector('.Div');

function loadMovies(movieName, movieYear) {
    return new Promise((resolve, reject) => {

        let movieXHR = new XMLHttpRequest();

        let paramsName = `&s=${movieName}`;
        let paramsYear = `&y=${movieYear}`;

        if (movieYear == '') 
        { movieXHR.open('GET', posterURL + paramsName, true); }
        else 
        { movieXHR.open('GET', posterURL + paramsName + paramsYear, true); }
        movieXHR.responseType = 'json';
        movieXHR.onload = () => 
        {
            let arrPoster = movieXHR.response.Search;
            resolve(arrPoster);
        }
        movieXHR.onerror = () => { reject('REJECT!!!'); }
        movieXHR.send();
        }
    );
}

function addPosterFilterInURL(event) {
    event.preventDefault();
    let movieName = event.target.elements[0].value;
    let movieYear = event.target.elements[1].value;

    if (movieName.length == '') {
        alert('Ошибка: вы не ввели название фильма');
    }

    load.style.display='block';

    console.log('send request');
    loadMovies(movieName, movieYear).then(
    arrPoster => {
        console.log('request complete');
         deleteOldPosters();
         
                if(arrPoster ){
                    arrPoster.forEach((elem, ) => {
                         
                           if (elem.Poster != "N/A") {
                            let newPoster = document.createElement('img');
                            newPoster.setAttribute('src', elem.Poster);
                            newPoster.setAttribute('invisible', '');
                            movies.append(newPoster);
                            setTimeout(() => {
                            newPoster.removeAttribute('invisible', '');
                });
            }
        });
    }
    else {

        let nothing = document.createElement('').innerHTML= 'Ничего не найдено';
        movies.append(nothing);
            }
        },
           
    );

}

function deleteOldPosters() {
    while (movies.firstChild) {
        movies.removeChild(movies.firstChild);
    }
}
