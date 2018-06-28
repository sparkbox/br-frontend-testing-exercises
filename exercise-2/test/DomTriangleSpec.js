const DomTriangle = require('../js/DomTriangle');
const expect = require('chai').expect;

describe('DomTriangle', () => {
  it('exists', () => {
    expect(DomTriangle).to.exist;
  });

  it('exposes first element value as sideALength', () => {
    var domTriangle = new DomTriangle({ value: "2" });

    expect(domTriangle.a()).to.equal(2);
  });

  it('exposes second element value as sideBLength', () => {
    var domTriangle = new DomTriangle({}, { value: "3" });

    expect(domTriangle.b()).to.equal(3);
  });

  it('exposes third element value as sideCLength', () => {
    var domTriangle = new DomTriangle({}, {}, { value: "4" });

    expect(domTriangle.c()).to.equal(4);
  });
});
