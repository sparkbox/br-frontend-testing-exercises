describe("Mapbox Map", function() {

  describe("location keys", function() {
    it("should create a key containing city, state, and country", function() {
      expect(MAP.buildKey("Dayton", "Ohio", "USA")).toEqual("DaytonOhioUSA");
    });

    it("should create the correct key when state is null", function() {
      expect(MAP.buildKey("Dayton", null, "USA")).toEqual("DaytonUSA");
    });

    it("should create the correct key when state is an empty string", function() {
      expect(MAP.buildKey("Dayton", "", "USA")).toEqual("DaytonUSA");
    });
  });

  describe("coords", function() {
    describe("valid", function() {
      it("should return true for [0,0]", function() {
        expect(MAP.validCoordinates([0, 0])).toBe(true);
      });

      it("should return true for [-23.123123, 76.2342345]", function() {
        expect(MAP.validCoordinates([-23.123123, 76.2342345])).toBe(true);
      });
    });

    describe("invalid", function() {
      it("should return false for null", function() {
        expect(MAP.validCoordinates(null)).toBe(false);
      });

      it("should return false for [null, null]", function() {
        expect(MAP.validCoordinates([null, null])).toBe(false);
      });

      it("should return false for undefined", function() {
        expect(MAP.validCoordinates(undefined)).toBe(false);
      });

      it("should return false for []", function() {
        expect(MAP.validCoordinates([])).toBe(false);
      });

      it("should return false for [1, 2, 3]", function() {
        expect(MAP.validCoordinates([1, 2, 3])).toBe(false);
      });
    });

    it("should ignore markers when the coordinates are invalid", function() {
      spyOn(MAP, 'validCoordinates').and.returnValue(false);
      expect(MAP.plotMarker( {coordinates: ""} )).toBeUndefined();
    });
  });

  describe("createMarkers", function() {
    beforeEach(function() {
      // step 5: Extract duplication here
    });

    xit("add each location to markers", function() {
      MAP.mapLocations = [
        { title: 'SXSW', coordinates: [30.2642942, -97.7440445] },
        { title: 'Converge SE', coordinates: [34.0007104, -81.0348144] }
      ];

      // step 1: Add locations to map

      expect(MAP.markers.length).toBe();  // step 2: What should this equal?
    });

    xit("sets the event count", function() {
      MAP.mapLocations = [
        { title: 'SXSW', coordinates: [30.2642942, -97.7440445] },
        { title: 'Converge SE', coordinates: [34.0007104, -81.0348144] }
      ];

      spyOn(MAP, 'setEventCount');

      // step 3: Add locations to map

      expect(MAP.setEventCount).toHaveBeenCalledWith();  // step 4: What parameters should have been passed
    });
  });
});
