/**********************************
 * Magic School Bus reminder 
 * Classifications:
 *  scalene: all three sides are different  
 *  isosceles: two of its sides are equal
 *  equilateral:  all three sides are equal
 * 
 * A Valid Triangle exists when:
 *  a + b > c
 *  a + c > b
 *  b + c > a 
 **********************************/

const TriangleClassifier = require('../js/TriangleClassifier');
const expect = require('chai').expect;

describe('TriangleClassifier', () => {
  it('exists', () => {
    expect(TriangleClassifier).to.exist;
  });

  it('classifies as scalene 4,3,2', () => {
    var result = new TriangleClassifier().classify(4,3,2);
    expect(result).to.equal('scalene');
  });

  // What happens when a side is 0?
  // What about a negative side?
});

