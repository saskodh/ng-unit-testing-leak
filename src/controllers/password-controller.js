'use strict';

angular.module('app')

  /**
   * Example controller taken from AngularJs unit testing guide.
   * */
  .controller('PasswordController', function PasswordController($scope) {
    $scope.password = '';
    $scope.grade = function() {
      var size = $scope.password.length;
      if (size > 8) {
        $scope.strength = 'strong';
      } else if (size > 3) {
        $scope.strength = 'medium';
      } else {
        $scope.strength = 'weak';
      }
    };
  });