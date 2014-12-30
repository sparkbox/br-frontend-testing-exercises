(function() {
  window.APP = {
    init: function() {
      return INIT.start();
    }
  };

  $(function() {
    return APP.init();
  });

}).call(this);
