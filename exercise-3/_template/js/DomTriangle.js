var DomTriangle = function(sideAElement, sideBElement, sideCElement) {

  this.sideALength = function() {
    return parseInt(sideAElement.value);
  };

  this.sideBLength = function() {
    return parseInt(sideBElement.value);
  };

  this.sideCLength = function() {
    return parseInt(sideCElement.value);
  };
};
