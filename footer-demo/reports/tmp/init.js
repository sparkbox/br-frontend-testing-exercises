(function() {
  window.INIT = {
    modules: [],
    register: function(module) {
      return this.modules.push(module);
    },
    start: function() {
      var module, _i, _len, _ref, _results;
      _ref = this.modules;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        module = _ref[_i];
        _results.push(module.init.call(module));
      }
      return _results;
    }
  };

}).call(this);
