(function () {
  'use strict';

  angular.module('MovieApp', ['ngCookies'])
  .controller('MovieController', MovieController)
  .controller('MovieList', MovieList)
  .service('MovieDataService',  MovieDataService)
  .service('MovieListService',  MovieListService);

  MovieList.$inject = ['MovieListService', '$rootScope'];
  function MovieList(MovieListService, $rootScope) {
    var movielst = this;
    MovieListService.listMovies().then(function(dat){
      $rootScope.lst = dat
      console.log($rootScope.lst)
    });

  }

  MovieController.$inject = ['MovieDataService', '$http','MovieListService', '$rootScope', '$cookieStore'];
  function MovieController(MovieDataService, $http,MovieListService, $rootScope, $cookieStore) {
    var moviectrl = this;

    MovieDataService.newMovies("2").then(function(d){
      moviectrl.movieOne = d[0]
      moviectrl.movieTwo = d[1]
    });
    moviectrl.oldMovieOne = ""
    moviectrl.oldMovieTwo = ""



    this.pickMovie = function (e){
      moviectrl.picked = e.target.getAttribute('data-value');
      if(moviectrl.picked == "Mov1") {
        var data = {
                  win: moviectrl.movieOne.id,
                  loose: moviectrl.movieTwo.id
              };
      } else {
        var data = {
                  win: moviectrl.movieTwo.id,
                  loose: moviectrl.movieOne.id
              };
      };


      $http.post('http://127.0.0.1:5000/moviedb/api/v1.0/edge', data)
            .then(function (data, status, headers) {
                console.log(data);
            }, function errorCallback(response) {
              // called asynchronously if an error occurs
              // or server returns response with an error status.
              return response;
            })
            ;

      moviectrl.oldMovieOne = moviectrl.movieOne;
      moviectrl.oldMovieTwo = moviectrl.movieTwo;
      MovieDataService.newMovies("2").then(function(d){
        moviectrl.movieOne = d[0]
        moviectrl.movieTwo = d[1]
      });
      MovieListService.listMovies().then(function(dat){
        $rootScope.lst = dat
        console.log($rootScope.lst)
      });
    }

    this.changeMovieOne = function (){
      MovieDataService.newMovies("1&vsmovie="+moviectrl.movieTwo.id).then(function(d){
        moviectrl.movieOne = d[0]
      });
    }

    this.changeMovieTwo = function (){
      MovieDataService.newMovies("1&vsmovie="+moviectrl.movieOne.id).then(function(d){
        moviectrl.movieTwo = d[0]
      });
    }



  };
  function MovieDataService ($http) {
    var service = this;


    //List of movies
    var movieout = [];

    service.newMovies = function (count){
      var promise = $http({
      method: 'GET',
      url: "http://127.0.0.1:5000/moviedb/api/v1.0/movies?count="+count
      }).then(function successCallback(response) {
        return response.data; //Probably need to remove movies
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

  function MovieListService ($http) {
    var service = this;


    //List of movies
    var movieout = [];

    service.listMovies = function (){
      var promise = $http({
      method: 'GET',
      url: "http://127.0.0.1:5000/moviedb/api/v1.0/toplist"
      }).then(function successCallback(response) {
        return response.data;
      }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
        return response
      });
      return promise;
    };

  }
})();
