$('.search-button').on('click', function () {
   $.ajax({
      url: 'http://www.omdbapi.com/?apikey=925c2bbf&i=&s=' + $('.input-keyword').val(),
      success: results => {
         const movies = results.Search;
         let movieCards = ''; 
         movies.forEach(movie => {
            movieCards += `
               <div class="col-md-4 my-3">
                  <div class="card" style="width: 18rem;">
                     <img src="${movie.Poster}" class="card-img-top" alt="...">
                     <div class="card-body">
                        <h5 class="card-title">${movie.Title}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">${movie.Year}</h6>
                        <p class="card-text">Ini film harry poter</p>
                        <a href="#" type="button" class="btn btn-primary modal-detail-btn" 
                        data-bs-toggle="modal" data-bs-target="#movieDetailModal" 
                        data-imdbid="${movie.imdbID}">Show Details</a>
                     </div>
                  </div>
               </div>`
         });
         $('.movieContainer').html(movieCards);

         // Detail button clicked
         $('.modal-detail-btn').on('click', function () {
            // ngambil data imdbid
            $.ajax({
               url: 'http://www.omdbapi.com/?apikey=925c2bbf&i=' + $(this).data('imdbid'),
               success: movie => {
                  const movieDetail = `
                  <div class="container-fluid">
                     <div class="row">
                        <div class="col-lg-5 col-sm" align="center">
                           <div class="row">
                              <img src="${movie.Poster}" alt="${movie.Title} class="w-100 img-fluid">
                           </div>
                        </div>
                        <div class="col-lg col-sm">
                           <ul class="list-group">
                              <li class="list-group-item"><h4>${movie.Title} (${movie.Year})</h4></li>
                              <li class="list-group-item"><strong>Director: </strong>${movie.Director}</li>
                              <li class="list-group-item"><strong>Actors: </strong>${movie.Actors}</li>
                              <li class="list-group-item"><strong>Writer: </strong>${movie.Writer}</li>
                              <li class="list-group-item"><strong>Plot: </strong><br>${movie.Plot}</li>
                           </ul>
                        </div>
                     </div>
                  </div>`;
                  $('.modal-body').html(movieDetail);
               },
               error: (err) => {
                  console.log(err.responsesText);
               }
            })
         })
      },
      error: (err) => {
         console.log(err.responsesText);
      }
   })
})
