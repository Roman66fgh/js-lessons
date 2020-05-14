let posterURL = 'http://www.omdbapi.com/?i=tt3896198&apikey=aef9b051';


let movieFilters = document.querySelector('#Filter')
movieFilters.addEventListener('submit', addPosterFilterInURL);

let movies = document.querySelector('#movies');
let load = document.querySelector('.loadDiv');

function addPosterFilterInURL(event) {
    event.preventDefault();
    let movieNameFromInput = event.target.elements[0].value;
    let movieYearFromInput = event.target.elements[1].value

    if (movieNameFromInput.length == '') {
        alert('Введите фильм');
        return;
    }

    if (isNaN(movieYearFromInput)) {
        alert('Введите год ');
        return;
    }

    load.style.display='block';

    console.log('send request');
    loadMovies(movieNameFromInput, movieYearFromInput)
        .then(
            arrPoster => {
                console.log('request complete');
                deleteOldPosters();
                let loadTimer;
                if(arrPoster ){
                    arrPoster.forEach((element, index) => {

                        loadTimer = 50 * (index + 1) ;
   
                       if (element.Poster != "N/A") {
                           let newPoster = document.createElement('img');
                           newPoster.setAttribute('src', element.Poster);
                           newPoster.setAttribute('hidden1', '');
                           movies.append(newPoster);
                           setTimeout(() => {
                               newPoster.removeAttribute('hidden1', '');
                           }, loadTimer);
                       }
                   });
                }
                  else {

                      let nothingToShow = document.createElement('p')
                      .innerHTML= ' Ответ не найден';

                      movies.append(nothingToShow);
                      
                  }
                setTimeout(()=>{
                    load.style.display='none';   
                }, loadTimer + 300)  
            },
            error => {
                alert(error);
                setTimeout(()=>{
                    load.style.display='none';   
                }, loadTimer + 300)  
            }
        );

}

function loadMovies(movieNameFromInput, movieYearFromInput) {
    return new Promise((resolve, reject) => {

        let movieXHR = new XMLHttpRequest();

        let paramsName = `&s=${movieNameFromInput}`;
        let paramsYear = `&y=${movieYearFromInput}`;

        if (movieYearFromInput == '') { movieXHR.open('GET', posterURL + paramsName, true); }
        else { movieXHR.open('GET', posterURL + paramsName + paramsYear, true); }


        movieXHR.responseType = 'json';

        movieXHR.onload = () => {
            let arrPoster = movieXHR.response.Search;
            resolve(arrPoster);

        }

        movieXHR.onerror = () => { reject('Error'); }
        movieXHR.send();
    }
    );
}

function deleteOldPosters() {

    while (movies.firstChild) {
        movies.removeChild(movies.firstChild);
    }
}