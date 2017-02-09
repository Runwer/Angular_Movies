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





  };


})();
