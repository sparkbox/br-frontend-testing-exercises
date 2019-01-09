const App = function() {
  const self = this;

  self.start = function() {
    self.$classification = document.getElementById('classification');

    clearClassification();
  };

  function clearClassification() {
    self.$classification.innerHTML = "";
  }

  return self;
};

export default App;
