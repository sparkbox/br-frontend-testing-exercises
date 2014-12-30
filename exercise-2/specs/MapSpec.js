(function() {
  describe("Mapbox Map", function() {
    describe("location keys", function() {
      it("should create a key containing city, state, and country", function() {
        return expect(MAP.buildKey("Dayton", "Ohio", "USA")).toEqual("DaytonOhioUSA");
      });
      it("should create the correct key when state is null", function() {
        return expect(MAP.buildKey("Dayton", null, "USA")).toEqual("DaytonUSA");
      });
      return it("should create the correct key when state is an empty string", function() {
        return expect(MAP.buildKey("Dayton", "", "USA")).toEqual("DaytonUSA");
      });
    });
    describe("coords", function() {
      describe("valid", function() {
        it("should return true for [0,0]", function() {
          return expect(MAP.validCoordinates([0, 0])).toBe(true);
        });
        return it("should return true for [-23.123123, 76.2342345]", function() {
          return expect(MAP.validCoordinates([-23.123123, 76.2342345])).toBe(true);
        });
      });
      describe("invalid", function() {
        it("should return false for null", function() {
          return expect(MAP.validCoordinates(null)).toBe(false);
        });
        it("should return false for [null, null]", function() {
          return expect(MAP.validCoordinates([null, null])).toBe(false);
        });
        it("should return false for undefined", function() {
          return expect(MAP.validCoordinates(void 0)).toBe(false);
        });
        it("should return false for []", function() {
          return expect(MAP.validCoordinates([])).toBe(false);
        });
        return it("should return false for [1, 2, 3]", function() {
          return expect(MAP.validCoordinates([1, 2, 3])).toBe(false);
        });
      });
      return it("should ignore markers when the coordinates are invalid", function() {
        spyOn(MAP, 'validCoordinates').andReturn(false);
        return expect(MAP.plotMarker({
          coordinates: ""
        })).toBe(void 0);
      });
    });
    return describe("createMarkers", function() {
      xit("add each location to markers", function() {
        MAP.mapLocations = [];
        return expect(MAP.markers.length).toBe(2);
      });
      return xit("sets the event count", function() {
        spyOn(MAP, 'setEventCount');
        return expect(MAP.setEventCount).toHaveBeenCalledWith(2);
      });
    });
  });

}).call(this);
