'use strict';

(function () {

  var testDefinition = function () {

    var suite = {};

    beforeEach(module('app'));

    beforeEach(inject(function ($rootScope, $compile, heavyLoad) {
      suite.$rootScope = $rootScope;
      suite.$compile = $compile;
      suite.heavyLoad = heavyLoad;
      suite.$scope = $rootScope.$new();

      spyOn(suite.heavyLoad, 'getHeavyString').and.callThrough();
      spyOn(suite.heavyLoad, 'getHeavyObject').and.callThrough();
      spyOn(suite.heavyLoad, 'getHeavyList').and.callThrough();
    }));

    // NOTE: cleanup
    afterEach(function () {

      // NOTE: prevents DOM elements leak
      suite.element.remove();
    });
    afterAll(function () {

      // NOTE: prevents memory leaks because of JavaScript closures created for the jasmine syntax
      // (beforeEach, afterEach, beforeAll, afterAll, it..).
      suite = null;
    });

    suite.compileDirective = function (template) {
      suite.element = suite.$compile(template)(suite.$scope);
      suite.directiveScope = suite.element.isolateScope();
      suite.directiveController = suite.element.controller('heavyLoad');
    };

    it('should compile correctly', function () {
      // given
      var givenTemplate = '<div heavy-load></div>';

      // when
      suite.compileDirective(givenTemplate);

      // then
      expect(suite.directiveScope.title).toBeDefined();
      expect(suite.directiveScope.items).toBeDefined();
      expect(suite.heavyLoad.getHeavyString).toHaveBeenCalled();
      expect(suite.heavyLoad.getHeavyList).toHaveBeenCalled();
    });
  };

  // define multiple suits with the same definition just for showcase
  for (var i = 0; i < 3000; i += 1) {
    describe('heavyLoad effective directive #' + i, testDefinition);
  }

})();