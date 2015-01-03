(function() {
  window.FOOTERTOGGLE = {
    toggleFooter: function() {
      var footer, secondFooter, toggleSpeed,
        _this = this;
      toggleSpeed = 500;
      footer = $(".js--site-footer");
      secondFooter = $(".js--second-footer");
      return this.$moreFooterTrigger.click(function(e) {
        e.preventDefault();
        if (!MAP.loaded) {
          MAP.load();
        }
        footer.toggleClass("site-footer--second-footer_is-open");
        if (secondFooter.hasClass("second-footer_is-open")) {
          secondFooter.removeClass("second-footer_is-open");
          return _this.$moreFooterTrigger.text(_this.collapsedText);
        } else {
          secondFooter.addClass("second-footer_is-open");
          $('html, body').animate({
            scrollTop: $('.js--site-footer--more-trigger-container').offset().top
          }, toggleSpeed);
          return _this.$moreFooterTrigger.text(_this.expandedText);
        }
      });
    },
    init: function() {
      this.$moreFooterTrigger = $(".js--site-footer--more-trigger");
      this.collapsedText = this.$moreFooterTrigger.text();
      this.expandedText = this.$moreFooterTrigger.data("expanded-text");
      return this.toggleFooter();
    }
  };

  INIT.register(FOOTERTOGGLE);

}).call(this);
