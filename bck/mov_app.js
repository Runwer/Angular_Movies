(function () {
'use strict';

angular.module('MsgApp', [])

.controller('MsgController', MsgController);

MsgController.$inject = ['$scope'];
function MsgController($scope){
  $scope.name = "Rune";
  $scope.movie = "TheHobbit_TheBattleoftheFiveArmies"

  $scope.sayMessage = function () {
return "Rune is just plain awesome!"

  };
$scope.pickMovie = function (){
  $scope.movie = "Interstellar"
}

}

})();
