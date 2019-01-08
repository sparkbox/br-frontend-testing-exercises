var DomTriangle = function(sideAElement, sideBElement, sideCElement) {

  this.len1 = function() {
    return parseInt(sideAElement.value);
  };

  this.len2 = function() {
    return parseInt(sideBElement.value);
  };

  this.len3 = function() {
    return parseInt(sideCElement.value);
  };
};

export default DomTriangle;