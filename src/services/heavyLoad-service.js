'use strict';

angular.module('app')

  /**
   * Example service that is heavy in memory usage.
   * */
  .factory('heavyLoad', function () {

    var heavyList = [];
    var heavyObject = {};
    var heavyString = '';

    // populate heavy string
    heavyString = new Array(10000).join(heavyString);

    // populate heavy object
    var propsList = 'qwertyuiopasdfghjklzxcvbnm';
    for (var i = 0; i < propsList.length; i += 1) {
      heavyObject[propsList[i]] = angular.copy(heavyString);
    }

    // populate heavy list
    for (var i = 0; i < 1000; i += 1) {
      heavyList.push(angular.copy(heavyObject));
    }

    return {
      getHeavyList: function () {
        return heavyList;
      },
      getHeavyObject: function () {
        return heavyObject;
      },
      getHeavyString: function () {
        return heavyString;
      }
    };
  });