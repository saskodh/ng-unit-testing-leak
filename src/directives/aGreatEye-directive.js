'use strict';

angular.module('app')

  /**
   * Example directive taken from AngularJs directive unit testing guide.
   * https://docs.angularjs.org/guide/unit-testing
   * */
  .directive('aGreatEye', function () {
    return {
      restrict: 'E',
      replace: true,
      template: '<h1>lidless, wreathed in flame, {{1 + 1}} times</h1>'
    };
  });