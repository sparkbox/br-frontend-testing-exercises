# Exercise 2: Running Tests with Grunt

1. `npm install` - Download dependencies (This could take a while)
2. `npm start` - Start grunt
3. Locate `createMarkers` tests in `specs/map.js`
4. Complete the _add each location to markers_ test:
  - Un-ignore the first test (line 61: `xit` -> `it`)
  - Call `MAP.createMarkers` to run the code under test on line 67
  - Complete the expectation (line 69: `toBe(2)`)
  - Confirm the test is now passing via grunt
5. Complete the _sets the event count_ test:
  - Un-ignore the second test (line 72: `xit` -> `it`)
  - Call `MAP.createMarkers` to run the code under test on line 80
  - Complete the expectation (line 82: `toHaveBeenCalledWith(2)`)
  - Confirm all tests are now passing via grunt
