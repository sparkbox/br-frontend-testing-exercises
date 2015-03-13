window.MAP = {
  marker: {
    type: "Feature",
    geometry: {
      type: "Point"
    },
    properties: {
      icon: {
        iconUrl: "/img/mapbox/marker--speaking.png",
        iconSize: [44, 51],
        iconAnchor: [22, 51],
        popupAnchor: [0, -51],
        className: "map--speaking"
      }
    },
  },

  openPopup: function(id) {
    var _this = this;
    return this.map.markerLayer.eachLayer(function(marker) {
      if (marker.feature.properties.id === id) {
        _this.map.setView(marker.getLatLng(), 6, {
          pan: {
            animate: true
          }
        });
        return marker.openPopup();
      }
    });
  },

  linkSidebar: function() {
    return $(".map-footer--nav").on("click", ".map-footer--nav-item", function(e) {
      var state;
      MAP.openPopup($(this).data("marker-id"));
      state = APP.getState();
      if (state === "small" || state === "default") {
        MAP.openCloseNav();
      }
      return e.preventDefault();
    });
  },

  setEventCount: function(count) {
    return $(".map-footer--event-count").html(count);
  },

  buildKey: function(city, state, country) {
    var result;
    result = "";
    if (city) {
      result += city;
    }
    if (state) {
      result += state;
    }
    if (country) {
      return result += country;
    }
  },

  validCoordinates: function(coords) {
    return !(!$.isArray(coords) || coords.length !== 2 || coords[0] === null ||
        coords[1] === null || isNaN(coords[0]) || isNaN(coords[1]));
  },

  plotMarker: function(location) {
    var marker;

    if (location && MAP.validCoordinates(location.coordinates)) {
      marker = JSON.parse(JSON.stringify(MAP.marker));
      marker.geometry.coordinates = location.coordinates;
      marker.properties.city = location.city;
      marker.properties.state = location.state;
      marker.properties.id = MAP.buildKey(location.city, location.state, location.country);
    }

    return marker;
  },

  createMarkers: function() {
    this.markers = this.mapLocations
      .map(this.plotMarker)
      .filter( function(marker) { return marker != undefined; } );

    if(this.map != undefined) {
      this.map.markerLayer.setGeoJSON(this.markers);
      this.createPopups();
    }

    return this.setEventCount(this.markers.length);
  },

  listTemplate: Handlebars.compile("<ul>\n  {{#each this}}\n    <li>\n      <a href=\"#\" title=\"View {{title}} on the map\" class=\"map-footer--nav-item {{#if is-highlighted}}map-footer--nav-item_highlighted{{/if}}\" data-marker-id=\"{{city}}{{state}}{{country}}\">\n        <h4 class=\"map-footer--nav-title\">{{title}}</h4>\n        {{#if startDate}}\n          {{toFromDate startDateText endDateText}}\n        {{/if}}\n        <span class=\"map-footer--nav-location\">{{city}}{{#if state}}, {{state}}{{/if}}{{#isnt country \"United States\"}}, {{country}}{{/isnt}} </span>\n      </a>\n    </li>\n  {{/each}}\n</ul>"),
  popupTemplate: Handlebars.compile("{{#if hasMoreThanOne}}\n  <p class=\"map-footer--popup-title\">Events in {{firstLocation.city}}</p>\n{{/if}}\n\n<ul class=\"map-footer--popup-multi-city--list\">\n\n  {{#each locations}}\n    <li>\n      <h1 class=\"map-footer--popup-title{{#if ../hasMoreThanOne}}_multi-city{{/if}}\">\n        <a href=\"{{ link }}\">{{title}}</a>\n      </h1>\n      <div class=\"map-footer--popup-inner-content\">\n\n        {{#if startDateText}}\n          <p class=\"map-footer--popup-date\">{{startDateText}}</p>\n        {{/if}}\n\n        <p>{{{description}}}</p>\n\n        {{#if speakers}}\n          <h2 class=\"map-footer--popup-subheading\">Speaking:</h2>\n          <ul class=\"map-footer--popup-twitter-listing\">\n            {{#each speakers}}\n              <li>\n                <a href=\"//twitter.com/{{this}}\">{{this}}</a>\n              </li>\n            {{/each}}\n          </ul>\n        {{/if}}\n\n        {{#if attendees}}\n          <h2 class=\"map-footer--popup-subheading\">Attending:</h2>\n          <ul class=\"map-footer--popup-twitter-listing\">\n            {{#each attendees}}\n              <li>\n                <a href=\"//twitter.com/{{this}}\">{{this}}</a>\n              </li>\n            {{/each}}\n          </ul>\n        {{/if}}\n\n      </div>\n    </li>\n  {{/each}}\n\n</ul>"),

  popupContent: function(props) {
    var city, country, location, locations, state, _i, _len, _ref;
    city = props.city, state = props.state;
    locations = [];
    _ref = this.mapLocations;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      location = _ref[_i];
      if (location.city === city && location.state === state) {
        locations.push(location);
      }
    }
    return this.popupTemplate({
      locations: locations,
      firstLocation: locations[0],
      hasMoreThanOne: props.count > 1
    });
  },

  createPopups: function() {
    var _this = this;
    return this.map.markerLayer.eachLayer(function(layer) {
      var content;
      content = _this.popupContent(layer.feature.properties);
      return layer.bindPopup(content, {
        closeButton: false,
        offset: new L.Point(0, -55)
      });
    });
  },

  openCloseNav: function() {
    var mapContainer;
    mapContainer = $(".map-footer--map-container");
    return mapContainer.toggleClass("map-footer--map-container_is-open");
  },

  navToggle: function() {
    var _this = this;
    return $(".js--map-footer--nav-trigger").click(function(e) {
      e.preventDefault();
      return _this.openCloseNav();
    });
  },

  hbHelpers: function() {
    Handlebars.registerHelper('isnt', function(value, test, options) {
      if (value !== test) {
        return options.fn(this);
      } else {
        return options.inverse(this);
      }
    });

    return Handlebars.registerHelper('toFromDate', function(start, end, options) {
      var endDate, endMonth, monthNames, startDate, startMonth;
      endDate = void 0;
      endMonth = void 0;
      monthNames = void 0;
      startDate = void 0;
      startMonth = void 0;
      monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
      startDate = new Date(start);
      endDate = new Date(end);
      startMonth = startDate.getMonth();
      endMonth = endDate.getMonth();
      if (startMonth === endMonth) {
        if (startDate.getDate() === endDate.getDate()) {
          return new Handlebars.SafeString("" + monthNames[startMonth] + " " + (startDate.getDate()) + ", " + (startDate.getFullYear()));
        } else {
          return new Handlebars.SafeString("" + monthNames[startMonth] + " " + (startDate.getDate()) + " - " + (endDate.getDate()) + ", " + (startDate.getFullYear()));
        }
      } else {
        return new Handlebars.SafeString("" + (monthNames[startMonth].substring(0, 3)) + " " + (startDate.getDate()) + "- " + (monthNames[endMonth].substring(0, 3)) + " " + (endDate.getDate()) + ", " + (endDate.getFullYear()));
      }
    });
  },

  load: function() {
    var _this = this;
    this.today = new Date();
    this.hbHelpers();
    return $.ajax({
      url: "/map-data.json",
      success: function(data) {
        var e;
        _this.mapLocations = typeof data === "object" ? data : JSON.parse(data);
        $(".map-footer--nav").html(_this.listTemplate(_this.mapLocations));
        try {
          _this.map = L.mapbox.map('map', 'sparkbox.gig7i1dj');
          _this.map.markerLayer.on('layeradd', function(e) {
            var feature, marker;
            marker = e.layer;
            feature = marker.feature;
            return marker.setIcon(L.icon(feature.properties.icon));
          });
          _this.createMarkers();
          _this.map.fitBounds(_this.map.markerLayer.getBounds(), {
            padding: [5, 5]
          });
          _this.navToggle();
          _this.map.scrollWheelZoom.disable();
          _this.setEventCount();
          _this.linkSidebar();
          return _this.loaded = true;
        } catch (_error) {
          e = _error;
        }
      }
    });
  }
};


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

FOOTERTOGGLE.init();
