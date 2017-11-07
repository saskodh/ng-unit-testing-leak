# ng-unit-testing-leak
Demo of Angular.js unit testing memory leaks with Karma and Jest

# Problem
The three major JavaScript testing frameworks (Jasmine, Mocha and Jest) share similar syntax for writing the tests and sharing context between before*, after* and it callbacks.

Example: 
```javascript
describe('Test suite', function() {
  var a, b;

  beforeEach(function() {
    // init heavy objects
    a = new Array(10000).join('x');
    b = new Array(10000).join('y');
  });

  // NOTE: often forgotten cleanup
  afterEach(function () {
    a = null;
    b = null;
  });

  it('spec1', function() {
    // spec code.. 
    // uses the declared variables a, b for some logic
  });

  // other specs and inner suites ..
});
```
The example project shows that this approach leaks memory as the three major frameworks will keep the created variables in memory until all the tests are run.
This builds-up the used memory and leads to crash before the test execution ends. In the case with Angular.js, the injector and the DOM elements that are recreated for each test will stay in the memory and lead to crash with executing just couple of hunderds tests.

# Proposed solution
Keep the variables in the context on a 'suite' object which will be null-ed in an afterAll callback. This will enable the GC to collect them.
For Angular.js directives compilation, clean up the compiled DOM element in an afterEach callback.

Example:
```javascript
describe('Test suite', function() {
  var suite = {};

  beforeEach(function() {
    // init heavy objects
    suite.a = new Array(10000).join('x');
    suite.b = new Array(10000).join('y');
  });

  // NOTE: cleanup
  afterEach(function () {
    suite.compiledElement.remove();
  });

  afterAll(function () {
    suite = null;
  });

  // other specs and inner suites ..
});
```

Related StackOverflow [question](https://stackoverflow.com/questions/32998442/angularjs-unit-testing-memory-leaks) and 
Jasmine [issue](https://github.com/jasmine/jasmine/issues/941).
