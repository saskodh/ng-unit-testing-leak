'use strict';

angular.module('app')

  /**
   * Example directive that is heavy loaded.
   * */
  .directive('heavyLoad', function (heavyLoad) {
    return {
      scope: {},
      template: '' +
      '<div>' +
      ' <h1>{{title}}</h1>' +
      ' <div ng-repeat="item in items">' +
      '   <div ng-repeat="propData in item">' +
      '     <p>{{propData}}</p>' +
      '   </div>' +
      ' </div>' +
      '</div>',
      link: function (scope, element) {
        scope.items = heavyLoad.getHeavyList();
        scope.title = heavyLoad.getHeavyString();

        // add data to the element
        element.data(heavyLoad.getHeavyList());
      }
    };
  });