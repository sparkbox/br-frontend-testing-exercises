import DomTriangle from '../js/DomTriangle';

describe('DomTriangle', () => {
  it('exists', () => {
    expect(DomTriangle).toBeDefined();
  });

  it('exposes first element value as sideALength', () => {
    const domTriangle = new DomTriangle({ value: "2" });

    expect(domTriangle.len1()).toBe(2);
  });

  it('exposes second element value as sideBLength', () => {
    const domTriangle = new DomTriangle({}, { value: "3" });

    expect(domTriangle.len2()).toBe(3);
  });

  it('exposes third element value as sideCLength', () => {
    const domTriangle = new DomTriangle({}, {}, { value: "4" });

    expect(domTriangle.len3()).toBe(4);
  });
});
