var App = function() {
  var self = this;

  self.start = function() {
    self.$classification = document.getElementById('classification');

    clearClassification();
  };

  function clearClassification() {
    self.$classification.innerText = "";
  }

  return self;
};
