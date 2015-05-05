var App = function() {
  this.start = function() {
    clearClassification();
  };

  function clearClassification() {
    document.getElementById('classification').innerText = "";
  }
};
