/******************************************************
 * Credits:
 *  jasmine-fixture by Justin Searls (@searls)
 *****************************************************/

describe('App', () => {
  xit('clears classification on startup', () => {
    $classificationEl = affix('#classification'); // affix returns a jQuery object
    $classificationEl.text('not a triangle');

    new App().start();

    expect($classificationEl.text()).toEqual('');
  });
});
