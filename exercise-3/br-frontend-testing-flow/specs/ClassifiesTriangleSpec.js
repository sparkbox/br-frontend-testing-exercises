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


describe('ClassifiesTriangle', function() {
  it('exists', function() {
    expect(ClassifiesTriangle).toBeDefined();
  });

  it('classifies as scalene 4,3,2', function() {
    var result = new ClassifiesTriangle().classify(4,3,2);
    expect(result).toEqual('scalene');
  });
});

