(function () {
  'use strict';

  angular.module('MovieApp', [])
  .controller('MovieController', MovieController)
  .service('MovieDataService',  MovieDataService);

  MovieController.$inject = ['MovieDataService'];
  function MovieController(MovieDataService) {
    var moviectrl = this;

    MovieDataService.newMovies().then(function(d){
      moviectrl.movieOne = d
    });
    MovieDataService.newMovies().then(function(d){
      moviectrl.movieTwo = d
    });
    moviectrl.oldMovieOne = ""
    moviectrl.oldMovieTwo = ""

    this.pickMovie = function (e){
      moviectrl.picked = e.target.getAttribute('data-value');
      moviectrl.oldMovieOne = moviectrl.movieOne;
      moviectrl.oldMovieTwo = moviectrl.movieTwo;
      MovieDataService.newMovies().then(function(d){
        moviectrl.movieOne = d
      });
      MovieDataService.newMovies().then(function(d){
        moviectrl.movieTwo = d
      });
    }

    this.changeMovieOne = function (){
      MovieDataService.newMovies().then(function(d){
        moviectrl.movieOne = d
      });
    }

    this.changeMovieTwo = function (){
      MovieDataService.newMovies().then(function(d){
        moviectrl.movieTwo = d
      });
    }



  };
  function MovieDataService ($http) {
    var service = this;


    //List of movies
    var movieout = [];
    var counter = -1;

    service.newMovies = function (){
      var promise = $http({
      method: 'GET',
      url: "movies.json"
      }).then(function successCallback(response) {
        counter += 1
        return response.data.movies[counter];
      }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
        return response
      });
      return promise;
    };

    service.oldMovies = function () {
      return "movie"
    }
  }
})();

this.getById = function(id){
  return $http.get(urlList.getCustomer + id).success(function (data) {
    return data;
  });
}
