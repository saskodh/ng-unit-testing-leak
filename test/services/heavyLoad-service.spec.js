'use strict';

describe('heavyLoad service', function () {

  var heavyLoad;

  beforeEach(angular.mock.module('app'));

  beforeEach(inject(function (_heavyLoad_) {
    heavyLoad = _heavyLoad_;
  }));

  it('should return heavy string', function () {
    // given / when / then
    expect(heavyLoad.getHeavyString()).toBeDefined();
  });

  it('should return heavy object', function () {
    // given / when / then
    expect(heavyLoad.getHeavyObject()).toBeDefined();
  });

  it('should return heavy list', function () {
    // given / when / then
    expect(heavyLoad.getHeavyList()).toBeDefined();
  });
});