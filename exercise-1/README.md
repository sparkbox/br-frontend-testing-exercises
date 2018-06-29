# Exercise 1: Getting to Know Jasmine

1. Open `TestRunner.html` in your browser
2. Locate `stop` tests in `spec/PlayerSpec.js`
4. Complete the _should indicate that no song is currently playing_ test:
  - Un-ignore the first test (line 60: `xit` -> `it`)
  - Complete the expectation (line 64: `expect(player.currentlyPlayingSong).toBeNull();`)
  - Confirm the test is now passing by refreshing SpecRunner.html
5. Complete the _should have no current song_ test:
  - Un-ignore the second test (line 67: `xit` -> `it`)
  - Complete the expectation (line 64: `expect(player.isPlaying).toBeFalsy();`)
  - Confirm all tests are now passing by refreshing SpecRunner.html
