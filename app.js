(function () {
'use strict';

angular.module('NameCalculator', [])

.controller('NameCalculatorController',NameCalculatorController);
NameCalculatorController.$inject = [$scope];

function NameCalculatorController($scope){
  $scope.name = "";
  $scope.totalValue = 0;

  $scope.displayNumeric = function(){
    var totalNameValue = calculateNumericString($scope.name); //get total value
    $scope.totalValue = totalNameValue;
  };

function calculateNumericString(string){
  var totalStringValue = 0;
  for (var i = 0; i < string.length; i++) {
    totalStringValue += string.charCodeAt(i);
  }
  return totalStringValue


}


}

})();
