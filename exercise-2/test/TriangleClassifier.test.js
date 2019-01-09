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

import TriangleClassifier from '../js/TriangleClassifier';

describe('TriangleClassifier', () => {
  it('exists', () => {
    expect(TriangleClassifier).toBeDefined();
  });

  it('classifies as scalene 4,3,2', () => {
    const triangle = {
      len1: () => 4,
      len2: () => 3,
      len3: () => 2
    };
    var result = new TriangleClassifier().classify(triangle);
    expect(result).toBe('scalene');
  });

  // What happens when a side is 0?
  // What about a negative side?
});

