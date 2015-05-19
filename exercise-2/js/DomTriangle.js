var DomTriangle = function(sideAElement, sideBElement, sideCElement) {

  this.a = function() {
    return parseInt(sideAElement.value);
  };

  this.b = function() {
    return parseInt(sideBElement.value);
  };

  this.c = function() {
    return parseInt(sideCElement.value);
  };
};
