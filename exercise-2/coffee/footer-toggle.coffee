window.FOOTERTOGGLE =

  toggleFooter: ->
    toggleSpeed = 500

    footer = $(".js--site-footer")
    secondFooter = $(".js--second-footer")

    @$moreFooterTrigger.click (e) =>
      e.preventDefault()

      MAP.load() unless MAP.loaded

      footer.toggleClass("site-footer--second-footer_is-open")

      if secondFooter.hasClass("second-footer_is-open")
        secondFooter.removeClass("second-footer_is-open")
        @$moreFooterTrigger.text(@collapsedText)
      else
        secondFooter.addClass("second-footer_is-open")
        $('html, body').animate
          scrollTop: $('.js--site-footer--more-trigger-container').offset().top
        , toggleSpeed
        @$moreFooterTrigger.text(@expandedText)

  init: ->
    @$moreFooterTrigger = $(".js--site-footer--more-trigger")
    @collapsedText = @$moreFooterTrigger.text()
    @expandedText = @$moreFooterTrigger.data("expanded-text")

    @toggleFooter()


INIT.register FOOTERTOGGLE