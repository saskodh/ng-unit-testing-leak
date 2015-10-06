'use strict';

(function () {

  var testDefinition = function () {

    var heavyLoad, $compile;
    var element, $rootScope, $scope, directiveScope, directiveController;
    var compileDirective;

    beforeEach(module('app'));

    beforeEach(inject(function (_$rootScope_, _$compile_, _heavyLoad_) {
      $rootScope = _$rootScope_;
      $compile = _$compile_;
      heavyLoad = _heavyLoad_;
      $scope = $rootScope.$new();

      spyOn(heavyLoad, 'getHeavyString').and.callThrough();
      spyOn(heavyLoad, 'getHeavyObject').and.callThrough();
      spyOn(heavyLoad, 'getHeavyList').and.callThrough();
    }));

    compileDirective = function (template) {
      element = $compile(template)($scope);
      directiveScope = element.isolateScope();
      directiveController = element.controller('heavyLoad');
    };

    it('should compile correctly', function () {
      // given
      var givenTemplate = '<div heavy-load></div>';

      // when
      compileDirective(givenTemplate);

      // then
      expect(directiveScope.title).toBeDefined();
      expect(directiveScope.items).toBeDefined();
      expect(heavyLoad.getHeavyString).toHaveBeenCalled();
      expect(heavyLoad.getHeavyList).toHaveBeenCalled();
    });
  };

  // define multiple suits with the same definition just for showcase
  /* TODO: uncomment this if you want to see the memory leaks
  for (var i = 0; i < 1000; i += 1) {
    describe('heavyLoad directive #' + i, testDefinition);
  }
  */

})();