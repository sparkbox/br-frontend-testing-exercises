(function() {
  window.MAPDATA = {
    icons: {
      sparkbox: {
        iconUrl: "/img/mapbox/marker--sb-hq.png",
        iconSize: [44, 51],
        iconAnchor: [22, 51],
        popupAnchor: [0, -51],
        className: "map--sb-hq"
      },
      speaking: {
        iconUrl: "/img/mapbox/marker--speaking.png",
        iconSize: [44, 51],
        iconAnchor: [22, 51],
        popupAnchor: [0, -51],
        className: "map--speaking"
      },
      buildright: {
        iconUrl: "/img/mapbox/marker--build-right.png",
        iconSize: [44, 51],
        iconAnchor: [22, 51],
        popupAnchor: [0, -51],
        className: "map--build-right"
      },
      attending: {
        iconUrl: "/img/mapbox/marker--attending.png",
        iconSize: [44, 51],
        iconAnchor: [22, 51],
        popupAnchor: [0, -51],
        className: "map--sb-hq"
      }
    },
    marker: {
      type: "Feature",
      geometry: {
        type: "Point"
      },
      properties: {}
    }
  };

  window.MAP = {
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
      if (!$.isArray(coords)) {
        return false;
      }
      if (coords.length !== 2) {
        return false;
      }
      if (coords[0] === null || coords[1] === null || isNaN(coords[0]) || isNaN(coords[1])) {
        return false;
      }
      return true;
    },
    plotMarker: function(location) {
      var icon, marker;
      if (location && MAP.validCoordinates(location.coordinates) && (location.endDate === void 0 || location.endDate >= this.today)) {
        icon = location.icon || "attending";
        marker = JSON.parse(JSON.stringify(MAPDATA.marker));
        marker.geometry.coordinates = location.coordinates;
        marker.properties.icon = JSON.parse(JSON.stringify(MAPDATA.icons[icon]));
        marker.properties.description = location.description;
        marker.properties.title = location.title;
        marker.properties.city = location.city;
        marker.properties.state = location.state;
        marker.properties.country = location.country;
        marker.properties.id = MAP.buildKey(location.city, location.state, location.country);
        marker.properties.count = 1;
        marker.properties.people = location.people;
        marker.properties.startDate = location.startDateText;
      }
      return marker;
    },
    goingToCity: function(city, state) {
      var m, result, _i, _len, _ref, _ref1;
      result = false;
      _ref = this.markers;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        m = _ref[_i];
        if ((m != null ? (_ref1 = m.properties) != null ? _ref1.city : void 0 : void 0) === city && m.properties.state === state) {
          m.properties.count += 1;
          m.properties.icon.iconUrl = "/img/mapbox/marker--" + m.properties.count + ".png";
          result = true;
        }
      }
      return result;
    },
    createMarkers: function() {
      var count, location, marker, _i, _len, _ref;
      this.markers = [];
      count = 0;
      _ref = this.mapLocations;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        location = _ref[_i];
        if (location.title === "Sparkbox Headquarters" || Date.parse(location.endDateText) > new Date()) {
          count++;
          marker = this.plotMarker(location);
          if (!(marker === void 0 || this.goingToCity(location.city, location.state))) {
            this.markers.push(marker);
          }
        }
      }
      this.map.markerLayer.setGeoJSON(this.markers);
      this.createPopups();
      return this.setEventCount(count);
    },
    listTemplate: Handlebars.compile("<ul>\n  {{#each this}}\n    <li>\n      <a href=\"#\" title=\"View {{title}} on the map\" class=\"map-footer--nav-item {{#if is-highlighted}}map-footer--nav-item_highlighted{{/if}}\" data-marker-id=\"{{city}}{{state}}{{country}}\">\n        <h4 class=\"map-footer--nav-title\">{{title}}</h4>\n        {{#if startDate}}\n          {{toFromDate startDateText endDateText}}\n        {{/if}}\n        <span class=\"map-footer--nav-location\">{{city}}{{#if state}}, {{state}}{{/if}}{{#isnt country \"United States\"}}, {{country}}{{/isnt}} </span>\n      </a>\n    </li>\n  {{/each}}\n</ul>"),
    popupTemplate: Handlebars.compile("{{#if hasMoreThanOne}}\n  <p class=\"map-footer--popup-title\">Events in {{firstLocation.city}}</p>\n{{/if}}\n\n<ul class=\"map-footer--popup-multi-city--list\">\n\n  {{#each locations}}\n    <li>\n      <h1 class=\"map-footer--popup-title{{#if ../hasMoreThanOne}}_multi-city{{/if}}\">\n        <a href=\"{{ link }}\">{{title}}</a>\n      </h1>\n      <div class=\"map-footer--popup-inner-content\">\n\n        {{#if startDateText}}\n          <p class=\"map-footer--popup-date\">{{startDateText}}</p>\n        {{/if}}\n\n        <p>{{{description}}}</p>\n\n        {{#if speakers}}\n          <h2 class=\"map-footer--popup-subheading\">Speaking:</h2>\n          <ul class=\"map-footer--popup-twitter-listing\">\n            {{#each speakers}}\n              <li>\n                <a href=\"//twitter.com/{{this}}\">{{this}}</a>\n              </li>\n            {{/each}}\n          </ul>\n        {{/if}}\n\n        {{#if attendees}}\n          <h2 class=\"map-footer--popup-subheading\">Attending:</h2>\n          <ul class=\"map-footer--popup-twitter-listing\">\n            {{#each attendees}}\n              <li>\n                <a href=\"//twitter.com/{{this}}\">{{this}}</a>\n              </li>\n            {{/each}}\n          </ul>\n        {{/if}}\n\n      </div>\n    </li>\n  {{/each}}\n\n</ul>"),
    popupContent: function(props) {
      var city, country, location, locations, state, _i, _len, _ref;
      city = props.city, state = props.state, country = props.country;
      locations = [];
      _ref = this.mapLocations;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        location = _ref[_i];
        if (location.city === city && location.state === state && location.country === country) {
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

}).call(this);
