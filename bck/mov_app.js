(function () {
  'use strict';

  angular.module('MovieApp', [])
  .controller('MovieController', MovieController);


  MovieController.$inject = ['$scope', '$http'];
  function MovieController($scope, $http) {
      //Test of json parser
    $scope.i = 0
    $http.get("movies.json", { cache: true}).then(function successCallback(response) {
      $scope.alljson = response.data.movies;
      //$scope.$apply()
      $scope.movieOne = $scope.alljson[$scope.i]
      $scope.movieTwo = $scope.alljson[$scope.i + 1]

    });



    $scope.pickMovie = function (){
      //Function to get which movie was picked
      //Send data to api [uid, id{moviepicked}, id{movienotpicked}]
      //Update variable to use in centerbar
      //Get 2 new movies from API
      $http({
      method: 'GET',
      url: "movies.json"
      }).then(function successCallback(response) {
        $scope.alljson = response.data.movies;
        $scope.movieOne = $scope.alljson[$scope.i]
        $scope.movieTwo = $scope.alljson[$scope.i + 1]
      }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
      });
      $scope.i += 2;

    }

    $scope.changeMovie = function (mov){
      //Get new movie != to vs. movie & not yet matched
      $http({
      method: 'GET',
      url: "movies.json"
      }).then(function successCallback(response) {
        $scope.alljson = response.data.movies;
        $scope.movieOne = $scope.alljson[$scope.i+1]
      }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
      });
      $scope.i += 1;
    }

    //$scope.matchup
    //Function to show two last movies. Which was picked by user
    //And how many other chose each movie
    //len({uid:id_movie1})/(len({uid:id_movie1})+len({uid:id_movie1}))

    //Set cookie : https://docs.angularjs.org/api/ngCookies/service/$cookies




  };


})();
