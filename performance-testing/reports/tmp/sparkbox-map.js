(function() {
  window.SPARKBOXMAP = {
    $map: $("#sparkbox-map"),
    $header: $(".site-header"),
    $footer: $(".site-footer"),
    $window: $(window),
    popupContent: "<p class=\"map-footer--popup-title\">Sparkbox Headquarters</p>\n<div class=\"map-footer--popup-inner-content\">\n  123 Webster St., Dayton, OH 45403\n</div>",
    zoomlevel: function() {
      return Math.floor(2.15 * Math.log(this.$window.width()));
    },
    sizeMap: function() {
      var footerHeight, headerHeight, windowHeight;
      windowHeight = this.$window.height();
      headerHeight = parseInt(this.$header.css('height'), 10);
      footerHeight = parseInt(this.$footer.css('height'), 10);
      this.$map.height((windowHeight - headerHeight - footerHeight) + "px");
      return this.map.setView([39.763202, -84.182599], this.zoomlevel());
    },
    addSBPin: function() {
      var marker;
      marker = [
        {
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [-84.182599, 39.763202]
          },
          properties: {
            title: "Sparkbox Headquarters",
            description: "123 Webster St., Dayton, OH 45403",
            icon: {
              iconUrl: "/img/mapbox/marker--sb-hq.png",
              iconSize: [44, 51],
              iconAnchor: [22, 51],
              popupAnchor: [0, -51],
              className: "map--sb-hq"
            }
          }
        }
      ];
      return this.map.markerLayer.setGeoJSON(marker);
    },
    createPopup: function() {
      var _this = this;
      return this.map.markerLayer.eachLayer(function(layer) {
        return layer.bindPopup(_this.popupContent, {
          closeButton: false,
          offset: new L.Point(0, -55)
        });
      });
    },
    changeLinkForAndroid: function() {
      if (/Android/.test(navigator.userAgent)) {
        return $(".native-map-link").attr("href", "geo: 39.763202, -84.182599");
      }
    },
    init: function() {
      var _this = this;
      this.changeLinkForAndroid();
      if (this.$map.length) {
        try {
          this.map = L.mapbox.map('sparkbox-map', 'sparkbox.h6e7g4i7');
          this.map.markerLayer.on('layeradd', function(e) {
            var feature, marker;
            marker = e.layer;
            feature = marker.feature;
            return marker.setIcon(L.icon(feature.properties.icon));
          });
          this.addSBPin();
          this.createPopup();
          this.sizeMap();
        } catch (_error) {}
        return $(window).on("resize", function() {
          return _this.sizeMap();
        });
      }
    }
  };

  INIT.register(SPARKBOXMAP);

}).call(this);
